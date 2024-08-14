// server.js

const http = require('http');
const app = require('./app');
const socketio = require('socket.io');

const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', socket => {
  console.log('New connection established.');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
