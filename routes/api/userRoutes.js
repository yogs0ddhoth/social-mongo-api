const router = require('express').Router();
const {
  createUser, getUsers, getUser, updateUser, deleteUser,
  addFriend, removeFriend
} = require('../../controllers/userController'); 

router.route('/') // CREATE single User, READ all Users
  .post(createUser).get(getUsers);

router.route('/:userId') // READ, UPDATE, & DELETE single User by _id
  .get(getUser).put(updateUser).delete(deleteUser);


router.route('/:userId/friends/:friendId') // UPDATE User.friends by _id
.put(addFriend).delete(removeFriend);

module.exports = router;