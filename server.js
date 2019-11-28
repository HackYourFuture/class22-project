const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const connectDB = require('./config/db');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users');

// Connect Database

connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

io.on('connection', socket => {
  console.log('New WebSocket connection');

  socket.on('chat join', (msg, callback) => {
    const { error, user } = addUser({ id: socket.id, ...msg });

    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    socket.emit('chat join', {
      username: 'Admin',
      message: `${user.username} welcome to group chat!`,
    });
    socket.broadcast
      .to(user.room)
      .emit('chat join', { username: user.username, message: 'has joined!' });
    io.to(user.room).emit('chat users', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    callback();
  });

  socket.on('chat message', msg => {
    console.log('msg listen', msg);
    const user = getUser(socket.id);
    io.to(user.room).emit('chat message', msg);
  });

  socket.on('chat leave', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('chat leave', { username: user.username, message: 'has left!' });
      io.to(user.room).emit('chat users', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
