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
    return res.status(201).json({ msg: 'User Created', token: token });
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
    return res.status(200).json({ msg: 'User logged in', token: token });
  }
  throw new AppError('Password is invalid', 401);
});

const getUser = asyncHandler(async (req, res) => {
  const userId = req.user;
  const keyword = req.query.keyword;
  let user;

  if (keyword) {
    user = await User.findById(keyword)
      .populate('likes')
      .populate('favorites')
      .populate('postsCreated');
  } else {
    user = await User.findById(userId)
      .populate('likes')
      .populate('favorites')
      .populate('postsCreated');
  }

  if (user) {
    return res.json({ msg: 'Success', user: user });
  }

  res.json({ msg: 'Failed' });
});

module.exports = { registerUser, authUser, getUser };
