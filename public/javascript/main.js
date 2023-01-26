const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

//get username and room from url
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

const socket = io();
//join chatroom
socket.emit('joinRoom', {username, room});

//get room and users
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
})

// message from server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;
})
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    //emit message to server
    socket.emit('chatMessage', msg);
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = ` <p class="meta">${message.username}<span>${message.time}</span></p>
    <p class="text">
      ${message.text}
    </p> `;
    document.querySelector('.chat-messages').appendChild(div);
}
//add roomname to DOM
function outputRoomName(room) {
    roomName.innerText = room;
}
// add users to DOM
function outputUsers(users) {
    console.log(users ," ----users");
    console.log(userList, " -----userList");
    userList.innerHTML = `
      ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}
