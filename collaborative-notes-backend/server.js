// server.js

const http = require('http');
const app = require('./app');
const socketio = require('socket.io');
const Note = require('./models/Note');

const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', (socket) => {
  console.log('New connection established.');

  // Join a room for real-time note collaboration
  socket.on('joinNote', (noteId) => {
    socket.join(noteId);
    console.log(`User joined note ${noteId}`);
  });

  // Handle real-time note updates
  socket.on('editNote', async ({ noteId, title, content }) => {
    try {
      const note = await Note.findById(noteId);
      if (!note) {
        return socket.emit('error', 'Note not found');
      }

      note.title = title || note.title;
      note.content = content || note.content;
      await note.save();

      io.to(noteId).emit('noteUpdated', note);
    } catch (err) {
      socket.emit('error', 'Server error');
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
