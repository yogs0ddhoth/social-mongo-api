const router = require('express').Router();

const {
  createUser, getUsers, getUser, updateUser, addFriend
} = require('../../controllers/userController'); 

router.route('/') // CREATE single User, READ all Users
  .post(createUser).get(getUsers);

router.route('/:userId') // READ single User by _id
  .get(getUser).put(updateUser);


router.route('/:userId/friends/:friendId') // UPDATE User.friends by _id
  .put(addFriend);

module.exports = router;