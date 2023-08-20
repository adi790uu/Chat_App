const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const url = process.env.URL;
const dbStart = require('./config/db');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const { Server } = require('socket.io');
const User = require('./models/userSchema');

const myself = async myId => {
  const loggName = await User.findById(myId);
  console.log(loggName.username);
  return loggName.username;
};

app.use(
  cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
    credentials: true, // Enable CORS with credentials (cookies, authorization headers, etc.)
  })
);
dbStart(url);
app.use(express.json());
app.use('/api/v1/users', require('./routes/userRoutes'));

app.get('/', (req, res) => {
  res.json({ msg: 'Api working...' });
});

const server = app.listen(port, () => {
  console.log('Server running');
});

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

const getRoomName = (friendId, myId) => {
  return friendId < myId ? `${friendId}-${myId}` : `${myId}-${friendId}`;
};

io.on('connection', socket => {
  console.log(`User connected! ${socket.id}`);

  socket.on('joinRoom', data => {
    const roomName = getRoomName(data.friendId, data.myself);
    console.log(roomName);
    socket.join(roomName);
  });

  socket.on('sendMessage', async data => {
    console.log(data.user, data.message);
    console.log(data.loggedIn);
    const sender = await myself(data.loggedIn);
    console.log(sender);
    const roomName = getRoomName(data.user._id, data.loggedIn);
    io.to(roomName).emit('message', { message: data.message, sender: sender });
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected!`);
  });
});

app.use(errorHandler);
