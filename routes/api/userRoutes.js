const router = require('express').Router();

const {
  getUsers, addFriend
} = require('../../controllers/userController');

router.route('/').get(getUsers);

router.route('/:userId/friends/:friendId').put(addFriend);

module.exports = router;