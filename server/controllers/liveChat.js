var path = require('path');
var nodemailer = require('nodemailer');
var passportSocketIo = require('passport.socketio');
var config = require(path.join(__dirname, '../../APPconfig'));
var liveChatData = require('./liveChatData');

var users = {};
var admin = null;
var authorized = false;


function initSaveChatData(chat) {
    setInterval(() => {
        if (!Object.keys(users).length) return;
        liveChatData.save(users)
            .then(() => {
                console.log("users were saved to the DB");
                users = liveChatData.filterOld(users, chat);
            })
            .catch(err => {
                throw new Error(err);
            });
    }, config.liveChat.saveInterval);
}

function _sendSMS(user) {

    config.smsMailOptions.text = `A new user has logged onto live chat on jasongallagher.org: ${user}`;

    var transporter = nodemailer.createTransport(config.smtpConfig);

    transporter.sendMail(config.smsMailOptions, function(error, info) {
        if (error){
            console.log('error from sendMail method: ', error);
        } else {
            console.log(`SMS sent`);
        }
    });
}

function _handleQueryUser(socket, chat, message) {
    liveChatData.queryUser(message.room)
        .then((user) => {
            if (user) {
                users[user.id] = user;
                console.log("User restored from DB: ", user);

                // add the user back to the room and restore to admin
                socket.join(message.room);
                if (admin) {
                    admin.join(message.room);
                    socket.broadcast.to(admin.id).emit('admin userInit', users);
                    console.log('Restored user sent to admin: ', user);
                }

                // add the new message and broadcast
                users[user.id].messages.push(message);
                if (admin) _handleQueryUsers(socket, users, 0);
                chat.in(message.room).emit('chatMessage', message);

            } else {
                console.log('Message from unregistered socket: %s', socket.id);
            }
        });
}

function _handleQueryUsers(socket, users, offset) {
    socket.emit('admin userInit', users);
    liveChatData.queryUsers(users, offset)
        .then(archivedUsers => {
            socket.emit('admin archivedUserUpdate', archivedUsers);
            console.log("%s archived users sent to admin", archivedUsers.length);
        });
}

function _onAuthorizeSuccess(data, accept) {
    authorized = true;
    accept();
    console.log('socket.io: admin is authed')
}

function _onAuthorizeFail(data, message, error, accept) {
    authorized = false;
    accept(); // normal users should pass through
}

exports.socketio = function(http, sessionStore) {

    var io = require('socket.io')(http);
    var chat = io.of('/live-chat');

    initSaveChatData(chat);

    chat.use(passportSocketIo.authorize({
        cookieParser: require('cookie-parser'), //optional your cookie-parser middleware function. Defaults to require('cookie-parser')
        key:          config.__SESSION_KEY__,       //make sure is the same as in your session settings in app.js
        secret:       config.__SESSION_SECRET__,      //make sure is the same as in your session settings in app.js
        store:        sessionStore,        //you need to use the same sessionStore you defined in the app.use(session({... in app.js
        success:      _onAuthorizeSuccess,
        fail:         _onAuthorizeFail,
    }));

    chat.on('connection', function(socket) {
        console.log('Sockets connected: %s', io.engine.clientsCount);
        // console.log('from connection:', socket);

        socket.on('admin login', function (message, callback) {
            if (authorized) {
                admin = socket;
                admin.name = config.liveChat.adminName;
                console.log(users);
                Object.keys(users).forEach(u => {
                    admin.join(users[u].id);
                });

                socket.broadcast.emit('chatConnected', {id: admin.id, name: admin.name});
                console.log("admin logged in");

                // send namespaced id back to client
                callback(socket.id);

                // get archived users from DB and send to admin
                _handleQueryUsers(socket, users, 0)

            } else {
                admin = null;
                console.log('wrong admin password');
            }

        });

        socket.on('chatConnected', function(message, callback) {
            if (admin) {
                // var payload = {id: admin.id, name: admin.name};
                callback({id: admin.id, name: admin.name});
            } else {
                callback(null);
            }
        });

        socket.on('newUser', function(user, callback) {

            users[socket.id] = {
                id: socket.id,
                name: user.name,
                email: user.email,
                connected: user.connected,
                date: Date.now(),
                messages: []
            };

            socket.join(socket.id);

            if (admin) {
                admin.join(socket.id);
                socket.broadcast.to(admin.id).emit('admin userInit', users);
                console.log('new user to admin: ', user);
            } else {
                const message = {
                    id: null,
                    room: socket.id,
                    name: config.liveChat.adminName,
                    message: 'I\'m currently away, but I will receive your messages and get back to you very soon!',
                    date: Date.now()
                };
                socket.emit('chatMessage', message)
            }

            // callback sends namespaced room id back to client
            callback(socket.id);

            // send sms
            if (config.liveChat.sendSMS) {
                try {
                    _sendSMS(user.name);
                } catch(err) {
                    throw new Error(err);
                }
            }

        });

        socket.on('chatMessage', function(message) {
            if (message.room in users) {
                users[message.room].messages.push(message);
                chat.in(message.room).emit('chatMessage', message);
                console.log('User:', JSON.stringify(users[message.room], null, 2));
            } else {
                _handleQueryUser(socket, chat, message);
            }
        });

        socket.on('disconnect', function() {
            if (socket.id in users) {
                users[socket.id].connected = false;
               // console.log(id, users[id]);
            } else if (admin && socket.id === admin.id) {
                console.log('admin disconnected');
                admin = null;
                authorized = false;
                socket.broadcast.emit('chatDisconnected');
            }
            chat.in(socket.id).emit('disconnect', socket.id);
            socket.disconnect();
            console.log("Disconnected %s sockets remaining", io.engine.clientsCount);
        });

        socket.on('admin delete', function (user){
             if (io.sockets.connected[user]) {
                io.sockets.connected[user].disconnect();
                console.log('%s was deleted and disconnected by admin.', user);
            }

            if (user in users) {
                users[user].connected = false;

                liveChatData.save(users)
                    .then(() => {
                        console.log("users were saved to the DB");
                        delete users[user];
                        // console.log(admin);
                        _handleQueryUsers(socket, users, 0)
                    })
                    .catch(err => {
                        throw new Error(err);
                    });
            }
        });

        socket.on("typing", function (id) {
            console.log("typing: " + id);
            chat.emit("typing", socket.id);
        });

    });
};

exports.chatManager = function(req, res, next) {
    res.render("live-chat-manager", {
        title: "Manage Live Chat",
        activeClass: 'manage-live-chat'
    });
};

