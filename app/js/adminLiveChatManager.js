import moment from 'moment';
import io from 'socket.io-client';
import config from '../../APPconfig';

var socket = io( config.__SOCKET_IO_URL__ );

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
let isTyping = false;
let isTypingDetails = null;
let typingTimer = null;

function init() {

    if (!document.getElementById('userList')) return;

    socket.on('connect', socketConnect.bind(this, socket));
    socket.on('admin userInit', socketUserInit);
    socket.on('admin archivedUserUpdate', socketArchivedUserUpdate);
    // socket.on('admin newUser', socketNewUser);
    socket.on('chatMessage', socketChatmessage);
    socket.on('disconnect', socketDisconnect);
    socket.on('typing', socketIsTyping);

    userList.addEventListener('click', userListListener);
    archivedUserList.addEventListener('click', archivedUserListListener);
    postMessage.addEventListener('click', handleSubmit);
    message.addEventListener('input', handleOnChange);

    userList.innerHTML = renderUserList();
    messageList.innerHTML = '';
}

function socketConnect(socket) {
    console.log("socket.io connected. Id: " + socket.id);
    socket.emit('admin login', {}, (id) => {
        adminId = id;
    });
}

function socketUserInit(usersFromServer) {
    console.log('users update:', usersFromServer);
    users = usersFromServer || {};
    const keys = Object.keys(users);

    if (keys.length > 0) currentUser = keys[0];
    userList.innerHTML = renderUserList();
    messageList.innerHTML = getMessageList(currentUser, users);
}

function socketChatmessage(message) {
    console.log("message received", message);
    if (message.room in users) {
        users[message.room].messages.push(message);
        // console.log('User:', JSON.stringify(users[message.id], null, 2));
        userList.innerHTML = renderUserList();
        if (currentUser === message.room) {
            messageList.innerHTML = getMessageList(message.room, users);
        }
        document.querySelector("[data-user-id='" + message.room + "']")
            .className += ' new-messages';
    } else {
        console.log('Message from unregistered Socket ID: ', message)
    }
}

function socketIsTyping(resp) {
    let elem = document.querySelector('#userList [data-user-id="' + resp + '"]');

    if (!elem) return;

    if (isTyping) {
        window.clearTimeout(typingTimer);
    } else {
        isTypingDetails = elem.innerHTML;
    }

    elem.innerHTML = 'user is typing...';
    isTyping = true;

    typingTimer = window.setTimeout(() => {
        elem.innerHTML = isTypingDetails;
        isTyping = false;
    }, 1500);
}

function socketArchivedUserUpdate(usersFromServer) {
    // console.log(usersFromServer);
    archivedUsers = usersFromServer || {};
    console.log('archived users received: ', archivedUsers);
    const keys = Object.keys(users);

    archivedUserList.innerHTML = renderArchivedUserList();
}

function handleOnChange(e) {
    console.log("onchange");
    socket.emit('typing', adminId)
}

function socketDisconnect(user) {
    console.log(user + ' was disconnected');
    if (user in users) {
        users[user].connected = false;
        userList.innerHTML = renderUserList();
    }
}

function handleSubmit(e) {
    e.preventDefault();
    let msg = document.getElementById('message');
    let val = msg.value.trim();

    if (!val || !currentUser || !adminId) return;

    const message = {
        id: adminId,
        name: config.liveChat.adminName,
        room: currentUser,
        message: val,
        date: Date.now()
    };
    socket.emit('chatMessage', message);
    msg.value = '';
}

function deleteUser(user, socket) {
    delete users[user];
    socket.emit('admin delete', user);
    userList.innerHTML = renderUserList();
    messageList.innerHTML = '';

}

function renderUserList() {
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

function getMessageList(user, obj) {
    return (typeof obj[user] !== 'undefined') && obj[user].messages.length ?
        '<ul class="message-list">' + obj[user].messages.map(m => {
            return `<li class="message-list-message">
                        <div class="date pull-right">${moment(m.date).fromNow()}</div>
                        <div><strong>${m.name}</strong></div>
                        <div>${m.message}</div>
                    </li>`
        }).join('') + '</ul>': 'No messages yet.';
}

function userListListener(e) {
    e.stopPropagation();
    if (!e.currentTarget.children.length) return;

    if (e.target.getAttribute('id') === 'deleteUser') {
        const u = e.target.parentNode.getAttribute('data-user-id');
        console.log('user to delete: ', u);
        delete users[u];
        socket.emit('admin delete', u);
        userList.innerHTML = renderUserList();
    } else {
        currentUser = e.target.getAttribute('data-user-id') ||
            e.target.parentNode.getAttribute('data-user-id');
        userList.innerHTML = renderUserList();
        messageList.innerHTML = getMessageList(currentUser, users);
    }
}

function renderArchivedUserList() {
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

function archivedUserListListener(e) {
    e.stopPropagation();
    if (!e.currentTarget.children.length) return;

    currentUser = e.target.getAttribute('data-user-id') ||
        e.target.parentNode.getAttribute('data-user-id');

    messageList.innerHTML = getMessageList(currentUser, archivedUsers);
}

export default init;

