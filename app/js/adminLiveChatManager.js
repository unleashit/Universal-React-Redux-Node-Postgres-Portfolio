import moment from 'moment';
import io from 'socket.io-client';
import config from '../../APPconfig';

var socket = io.connect( config.__SOCKET_IO_URL__ );

const userList = document.getElementById('userList');
const archivedUserList = document.getElementById('archivedUserList');
const messageList = document.getElementById('messages');
const message = document.getElementById('message');
const postMessage = document.getElementById('postMessage');

let users = {};
let totalUsers = 0;
let archivedUsers = {};
let perPage = config.liveChat.adminPerPage;
let currentOffset = 0;
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
    message.addEventListener('keyup', handleSubmit);

    userList.innerHTML = renderUserList();
    messageList.innerHTML = '';
}

// *
// * socket.io callbacks
// *

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
    messageList.innerHTML = renderMessageList(currentUser, users);
    messageList.scrollTop = messageList.scrollHeight;
}

function socketChatmessage(message) {
    console.log("message received", message);
    if (message.room in users) {
        users[message.room].messages.push(message);
        // console.log('User:', JSON.stringify(users[message.id], null, 2));
        userList.innerHTML = renderUserList();

        if (currentUser === message.room) {
            messageList.innerHTML = renderMessageList(message.room, users);
            messageList.scrollTop = messageList.scrollHeight;
        }

        // add 'new-messages' class only if message is from client
        // TODO: persist the class after next renderMessages if needed
        if (message.id !== adminId) {
            document.querySelector("[data-user-id='" + message.room + "']")
                .classList.toggle('new-messages');
        }

    } else {
        console.log('Message from unregistered Socket ID: ', message)
    }
}

function socketIsTyping(resp) {
    console.log("socket is typing!!");
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
    archivedUsers = usersFromServer.users || {};
    totalUsers = usersFromServer.count;
    console.log('archived users received: ', archivedUsers);

    archivedUserList.innerHTML = renderArchivedUserList(currentOffset);
    document.getElementById('pagination')
        .addEventListener('click', handleChangePagination);
}

function socketDisconnect(user) {
    console.log(user + ' was disconnected');
    if (user in users) {
        users[user].connected = false;
        userList.innerHTML = renderUserList();
    }
}

// *
// * render methods
// *

function renderUserList() {
    return Object.keys(users).length ?
        '<ul class="user-list">' + Object.keys(users).map(u => {
            const connected = users[u].connected ? 'connected' : 'disconnected';
            const active = users[u].id === currentUser ? 'active': '';
            return `<li class="list-group-item ${connected} ${active}" data-user-id=${users[u].id}>
                        <i id="deleteUser" class="fa fa-trash"></i>&nbsp;&nbsp;
                        <span>${users[u].name}</span>
                        <span class="tag tag-pill tag-default pull-right">
                            ${users[u].messages.length}
                        </span>
                    </li>`
        }).join('') + '</ul>' : 'No current chats.';
}

function renderMessageList(user, obj) {
    return (typeof obj[user] !== 'undefined') && obj[user].messages.length ?
        '<ul class="message-list">' + obj[user].messages.map(m => {
            return `<li class="message-list-message">
                        <div class="date pull-right">${moment(m.date).fromNow()}</div>
                        <div class="name"><strong>${m.name}</strong></div>
                        <div>${m.message}</div>
                    </li>`
        }).join('') + '</ul>': 'No messages in chat.';
}

function renderArchivedUserList() {
    const archived = Object.keys(archivedUsers);
    // const currentGroup = archived.slice(currentOffset/10, perPage);

    return totalUsers ?
    '<ul class="user-list">' + archived.map(u => {
        return `<li class="archived list-group-item" data-user-id=${archivedUsers[u].id}>
                        <span>${archivedUsers[u].name}</span>
                        <span class="tag tag-pill tag-default pull-right">
                            ${archivedUsers[u].messages.length}
                        </span>
                    </li>`
    }).join('') + '</ul>' +
    (totalUsers > perPage ? renderPagination(archived) : '') // add pagination if needed
        : 'No archived chats.';
}

function renderPagination(archived) {
    const pages = Math.ceil(totalUsers / perPage);
    let links = '';
    for (let i=1; i < pages + 1; i++) {
        let active = i - 1 === (currentOffset / perPage) ? 'active' : '';
        links += `<li class="page-item ${active}"><a class="page-link" href="#">${i}</a></li>`
    }
    return `
        <nav>
          <ul id="pagination" class="pagination pagination-sm">
            ${links}
          </ul>
        </nav>
     `
}

// *
// * UI event callbacks
// *

function handleOnChange() {
    socket.emit('typing', currentUser)
}


function handleSubmit(e) {
    e.preventDefault();

    if (e.keyCode === 13 || e.target.getAttribute('id') === 'postMessage') {
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
        messageList.innerHTML = renderMessageList(currentUser, users);
        messageList.scrollTop = messageList.scrollHeight;
    }
}

function archivedUserListListener(e) {
    e.stopPropagation();
    if (!e.currentTarget.children.length) return;

    currentUser = e.target.getAttribute('data-user-id') ||
        e.target.parentNode.getAttribute('data-user-id');

    messageList.innerHTML = renderMessageList(currentUser, archivedUsers);
    messageList.scrollTop = messageList.scrollHeight;
}

function handleChangePagination(e) {
    e.stopPropagation();
    // if (!e.currentTarget.children.length) return;
    const pageNumber = e.target.innerText;
    let nextOffset;

    // if (pageNumber === 'prev') {
    //     nextOffset = currentOffset - perPage <= 0 ?
    //         0 : currentOffset - perPage;
    // } else if (pageNumber === 'next') {
    //     debugger;
    //     nextOffset = currentOffset + perPage >= totalUsers ?
    //         currentOffset : currentOffset + perPage;
    // } else {
        nextOffset = (pageNumber * perPage) - perPage;
    //}
    console.log(nextOffset);

    currentOffset = nextOffset;
    socket.emit('admin getUsers', nextOffset);
    // archivedUserList.innerHTML = renderArchivedUserList(currentOffset);
}

// function deleteUser(user, socket) {
//     delete users[user];
//     socket.emit('admin delete', user);
//     userList.innerHTML = renderUserList();
//     messageList.innerHTML = '';
//
// }

// function updateArchivedUsers(users) {
//     users.forEach(u => {
//         const archivedUser = document.querySelector("#archivedUserList [data-user-id='" + u + "']");
//         if (archivedUser) {
//             archivedUser.parentNode.removeChild(archivedUser);
//         }
//     })
// }

export default init;

