var path = require('path');
var nodemailer = require('nodemailer');
var config = require(path.join(__dirname, '/../config/appConfig'));

var users = {};
var admin = null;

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

exports.socketio = function(http) {

    var io = require('socket.io')(http);
    var chat = io.of('/live-chat');

    chat.on('connection', function(socket) {
        console.log('Sockets connected: %s', io.engine.clientsCount);
        // console.log('from connection:', socket);

        socket.on('admin login', function (message, callback) {
            if (message.pass === '1223') {
                admin = socket;
                console.log(users);
                Object.keys(users).forEach(u => {
                    admin.join(users[u].id);
                });
                console.log("admin logged in");

                // send namespaced id back to client
                callback(socket.id);

                socket.emit('admin userInit', users);
            } else {
                admin = null;
                console.log('wrong admin password');
            }
        });

        socket.on('newUser', function(user, callback) {

            var newUser = {
                id: socket.id,
                name: user.name,
                connected: user.connected,
                messages: []
            };
            users[socket.id] = newUser;

            socket.join(socket.id);

            if (admin) {
                admin.join(socket.id);
                socket.broadcast.to(admin.id).emit('admin newUser', newUser);
                console.log('new user to admin: ', user)
            } else {
                const message = {
                    id: 'admin',
                    room: user.name,
                    name: 'Jason Gallagher',
                    message: 'I\'m currently away, but I will receive your messages and get back to you very soon!',
                    date: Date.now()
                };
                socket.emit('chatMessage', message)
            }

            // callback sends namespaced room id back to client
            callback(socket.id);

            // send sms
            // try {
            //     _sendSMS(user.name);
            // } catch(err) {
            //     throw new Error(err);
            // }

            // console.log('Users object:', JSON.stringify(users, null, 2));
        });

        socket.on('chatMessage', function(message) {
            if (message.room in users) {
                users[message.room].messages.push(message);
                chat.in(message.room).emit('chatMessage', message);
                console.log('User:', JSON.stringify(users[message.room], null, 2));
            } else {
                console.log('Message from unregistered socket.', socket.id);
            }
            // chat.emit('chatMessage', message);
            // socket.broadcast.to(admin.id).emit('admin chatMessage', users[message.id])
        });

        socket.on('disconnect', function() {
            if (socket.id in users) {
                users[socket.id].connected = false;
               // console.log(id, users[id]);
            } else if (admin && socket.id === admin.id) {
                console.log('admin disconnected');
                admin = null;
            }
            chat.in(socket.id).emit('disconnect', socket.id);
            socket.disconnect();
            console.log("Disconnected %s sockets remaining", io.engine.clientsCount);
        });

        socket.on('admin delete', function (user){
            if (user in users) {
                delete users[user];
            }

            if (io.sockets.connected[user]) {
                io.sockets.connected[user].disconnect();
                console.log('%s was deleted and disconnected by admin.', user);
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

