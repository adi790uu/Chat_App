const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const url = process.env.URL;
const dbStart = require('./config/db');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const { Server } = require('socket.io');
const Messages = require('./models/messageSchema');
const User = require('./models/userSchema');

const myself = async myId => {
  const loggName = await User.findById(myId);
  console.log(loggName.username);
  return loggName.username;
};

const getRoomName = (friendId, myId) => {
  return friendId < myId ? `${friendId}-${myId}` : `${myId}-${friendId}`;
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

app.post('/api/v1/getMessages', async (req, res) => {
  const data = req.body;
  console.log(data);
  const roomName = getRoomName(data.friendId, data.myself);

  const messages = await Messages.find({ roomId: roomName });
  // console.log(messages);
  res.json({ success: true, data: messages });
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

io.on('connection', socket => {
  console.log(`User connected! ${socket.id}`);

  socket.on('joinRoom', data => {
    const roomName = getRoomName(data.friendId, data.myself);
    // console.log(roomName);
    socket.join(roomName);
  });

  socket.on('sendMessage', async data => {
    // console.log(data.user, data.message);
    console.log(data);
    const sender = await myself(data.loggedIn);
    // console.log(sender);
    const roomName = getRoomName(data.user._id, data.loggedIn);
    console.log(roomName);
    // const room = await Messages.findOne({ roomId: roomName });

    const res = await Messages.findOneAndUpdate(
      { roomId: roomName },
      {
        $addToSet: {
          messages: {
            msg: data.message,
            sender: sender,
          },
        },
      },
      { upsert: true, new: true }
    );

    socket
      .to(roomName)
      .emit('message', { message: data.message, sender: sender });
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected!`);
  });
});

app.use(errorHandler);
