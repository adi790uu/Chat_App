const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateToken');

const {
  registerUser,
  authUser,
  getFriends,
  searchUsers,
  addFriend,
} = require('../controllers/users');

router.route('/register').post(registerUser);
router.route('/login').post(authUser);
router.route('/friends').get(validateToken, getFriends);
router.route('/searchUsers').get(validateToken, searchUsers);
router.route('/add').post(validateToken, addFriend);

module.exports = router;
