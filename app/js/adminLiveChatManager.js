import moment from 'moment';
import io from 'socket.io-client';
import { __SOCKET_IO_URL__} from '../../APPconfig';

var socket = io( __SOCKET_IO_URL__ );

const userList = document.getElementById('userList');
const archivedUserList = document.getElementById('archivedUserList');
const messageList = document.getElementById('messages');
const message = document.getElementById('message');
const postMessage = document.getElementById('postMessage');
let users = {};
let archivedUsers = {};
let pagination = 0;
let adminId = null;
let currentUser = null;
let isTyping = null;

function init() {

    if (!document.getElementById('userList')) return;

    socket.on('connect', socketConnect.bind(this, socket));
    socket.on('admin userInit', socketUserInit);
    socket.on('admin archivedUserUpdate', socketArchivedUserUpdate);
    // socket.on('admin newUser', socketNewUser);
    socket.on('chatMessage', socketChatmessage);
    socket.on('disconnect', socketDisconnect);
    socket.on('typing', socketIsTyping);

    userList.addEventListener('click', handleUserListUI);
    archivedUserList.addEventListener('click', handleArchivedUserListUI);
    postMessage.addEventListener('click', handleSubmit);
    message.addEventListener('input', handleOnChange);

    userList.innerHTML = getUserList();
    messageList.innerHTML = '';
}

function socketConnect(socket) {
    console.log("socket.io connected. Id: " + socket.id);
    socket.emit('admin login', {
        id: socket.id,
        pass: '1223'
    }, (id) => {
        adminId = id;
    });
}

function socketUserInit(usersFromServer) {
    console.log('users update:', usersFromServer);
    users = usersFromServer || {};
    const keys = Object.keys(users);

    if (keys.length > 0) currentUser = keys[0];
    userList.innerHTML = getUserList();
    messageList.innerHTML = getMessageList(currentUser);
}

function socketChatmessage(message) {
    console.log("message received", message);
    if (message.room in users) {
        users[message.room].messages.push(message);
        // console.log('User:', JSON.stringify(users[message.id], null, 2));
        userList.innerHTML = getUserList();
        if (currentUser === message.room) {
            messageList.innerHTML = getMessageList(message.room);
        }
        document.querySelector("[data-user-id='" + message.room + "']")
            .className += ' new-messages';
    } else {
        console.log('Message from unregistered Socket ID: ', message)
    }
}

// function socketNewUser(newUser) {
//     users[newUser.id] = newUser;
//     userList.innerHTML = getUserList();
//
//     // updateArchivedUsers([newUser.id]);
//
//     console.log("a new user joined.");
// }

function socketIsTyping(resp) {
    console.log(resp);
}

function handleOnChange(e) {
    console.log("onchange");
    socket.emit('typing', adminId)
}

function socketDisconnect(user) {
    console.log(user + ' was disconnected');
    if (user in users) {
        users[user].connected = false;
        userList.innerHTML = getUserList();
    }
}

function handleSubmit(e) {
    e.preventDefault();
    let msg = document.getElementById('message');
    let val = msg.value.trim();

    if (!val || !currentUser || !adminId) return;
    const message = {
        id: adminId,
        name: 'Jason Gallagher',
        room: currentUser,
        message: val,
        date: Date.now()
    };
    console.log(message);
    socket.emit('chatMessage', message);
    msg.value = '';
}

function deleteUser(user, socket) {
    delete users[user];
    socket.emit('admin delete', user);
    userList.innerHTML = getUserList();
    messageList.innerHTML = '';

}

function getUserList() {
    return Object.keys(users).length ?
        '<ul class="user-list">' + Object.keys(users).map(u => {
            const connected = users[u].connected ? 'connected' : 'disconnected';
            const active = users[u].id === currentUser ? 'active': '';
            return `<li class="list-group-item ${connected} ${active}" data-user-id=${users[u].id}>
                        <i id="deleteUser" class="fa fa-trash"></i>&nbsp;&nbsp;
                        <span>${users[u].name}</span>
                        <span class="badge pull-right">
                            ${users[u].messages.length}
                        </span>
                    </li>`
        }).join('') + '</ul>' : 'No users currently signed in.';
}

function getMessageList(user) {
    return users[user] !== undefined && users[user].messages.length ?
        '<ul class="message-list">' + users[user].messages.map(m => {
            return `<li class="message-list-message">
                        <div class="date pull-right">${moment(m.date).fromNow()}</div>
                        <div><strong>${m.name}</strong></div>
                        <div>${m.message}</div>
                    </li>`
        }).join('') + '</ul>': 'No messages yet.';
}

function handleUserListUI(e) {
    e.stopPropagation();
    if (!e.currentTarget.children.length) return;

    if (e.target.getAttribute('id') === 'deleteUser') {
        const u = e.target.parentNode.getAttribute('data-user-id');
        console.log('user to delete: ', u);
        delete users[u];
        socket.emit('admin delete', u);
        userList.innerHTML = getUserList();
    } else {
        currentUser = e.target.getAttribute('data-user-id') ||
            e.target.parentNode.getAttribute('data-user-id');
        userList.innerHTML = getUserList();
        messageList.innerHTML = getMessageList(currentUser);
    }
}

function socketArchivedUserUpdate(usersFromServer) {
    // console.log(usersFromServer);
    archivedUsers = usersFromServer || {};
    console.log('archived users received: ', archivedUsers);
    const keys = Object.keys(users);

    archivedUserList.innerHTML = getArchivedUserList();
}

function getArchivedUserList() {
    return Object.keys(archivedUsers).length ?
    '<ul class="user-list">' + Object.keys(archivedUsers).map(u => {
        return `<li class="archived list-group-item" data-user-id=${archivedUsers[u].id}>
                        <span>${archivedUsers[u].name}</span>
                        <span class="badge pull-right">
                            ${archivedUsers[u].messages.length}
                        </span>
                    </li>`
    }).join('') + '</ul>' : 'No archived users.';
}

// function updateArchivedUsers(users) {
//     users.forEach(u => {
//         const archivedUser = document.querySelector("#archivedUserList [data-user-id='" + u + "']");
//         if (archivedUser) {
//             archivedUser.parentNode.removeChild(archivedUser);
//         }
//     })
// }

function handleArchivedUserListUI(e) {
    e.stopPropagation();
    if (!e.currentTarget.children.length) return;

    currentUser = e.target.getAttribute('data-user-id') ||
        e.target.parentNode.getAttribute('data-user-id');

    let messages = archivedUsers[currentUser].messages;

    let html = '<ul class="archived-messages">';
    html += messages.map(m => {
        return `
            <li>
                <div>${m.name}</div>
                <div>${m.message}</div>
            </li>
         `
    }).join('');

    html += '</ul>';
    messageList.innerHTML = html;
}

export default init;

