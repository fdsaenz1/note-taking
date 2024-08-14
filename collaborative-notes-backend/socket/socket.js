// socket/socket.js
const socketIO = require('socket.io');

let io;

const setupSocketIO = (server) => {
  io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.on('editNote', (note) => {
      socket.broadcast.emit('noteUpdated', note);
    });

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });
  });
};

module.exports = setupSocketIO;
