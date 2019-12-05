const http = require('http');
const socketio = require('socket.io');
const app = require('./server');
const server = http.createServer(app);
const io = socketio(server);
const {
  addSocketClient,
  removeSocketClient,
  getSocketClient,
  getReceiverSocketId,
} = require('./utils/friend');

io.on('connection', socket => {
  console.log('New WebSocket connection', socket.id);
  socket.on('sendAuth', senderId => {
    addSocketClient({ id: socket.id, senderId });
  });

  socket.on(
    'sendFriendAction',
    ({ senderName, senderId, receiverName, receiverId, eventType, notification }) => {
      const socketClient = getSocketClient(socket.id);
      socketClient.senderName = senderName;
      socketClient.senderId = senderId;
      socketClient.receiverName = receiverName;
      socketClient.receiverId = receiverId;
      socketClient.eventType = eventType;

      const { socketClientId, error } = getReceiverSocketId(socketClient.receiverId);
      const event = socketClient.eventType;
      if (!error) {
        io.to(socketClientId).emit(event, {
          socketClientId,
          senderId,
          senderName,
          receiverId,
          receiverName,
          eventType,
          notification,
        });
      }
    },
  );

  socket.on('disconnect', function() {
    removeSocketClient(socket.id);
    console.log('user disconnected');
  });
});

module.exports = server;
