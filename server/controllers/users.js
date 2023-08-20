const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const asyncHandler = require('express-async-handler');
const AppError = require('../config/AppError');

const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await User.findOne({ username });

  if (!username || !password) {
    throw new AppError('Fill the required fields', 400);
  }

  if (user) {
    throw new AppError('User Exists', 400);
  }

  const newUser = await User.create({ username, password: hash });

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' });

  if (newUser) {
    console.log(token);
    return res
      .status(201)
      .json({ msg: 'User Created', token: token, newUser: newUser });
  }
  throw new AppError({ msg: 'Some error occured' });
});

const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!username || !password) {
    throw new AppError('Fill the required fields', 400);
  }

  if (!user) {
    throw new AppError('User does not exist!', 404);
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' });
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    console.log(token);
    return res
      .status(200)
      .json({ msg: 'User logged in', token: token, user: user });
  }
  throw new AppError('Password is invalid', 401);
});

const searchUsers = asyncHandler(async (req, res) => {
  const searchQuery = req.query.search;
  console.log(searchQuery);
  const currentUser = req.user;
  const users = await User.find({
    _id: { $ne: currentUser },
    username: { $regex: searchQuery, $options: 'i' },
  });
  // console.log(users);
  res.json({ users: users });
});

const getFriends = asyncHandler(async (req, res) => {
  const userId = req.user;
  const friends = await User.findById(userId).populate('friends');
  res.json({ msg: 'Success', friends: friends });
});

const addFriend = asyncHandler(async (req, res) => {
  const { friendId } = req.body;

  const myId = req.user;
  const user = await User.findOneAndUpdate(
    { _id: myId },
    { $push: { friends: friendId } },
    { new: true }
  );

  const friend = await User.findOneAndUpdate(
    { _id: friendId },
    { $push: { friends: myId } },
    { new: true }
  );

  res.json({ msg: 'Success', user: user });
});

module.exports = { registerUser, authUser, getFriends, searchUsers, addFriend };
