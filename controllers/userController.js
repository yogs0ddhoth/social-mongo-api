const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

module.exports = { // CRUD Operations:
  async createUser (req, res) { // create single User
    // Expect -> req.body: {'username': <string>, 'email': <string>}
    try {
      const user = await User.create(req.body);

      return res.json(user)
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async getUsers (req, res) { // get all users
    try {
      const users = await User.find()
        // .populate('thoughts')
        .populate('friends', '_id username email');

      return res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async getUser (req, res) { // get single user by _id
    try {
      const user = await User.findById(req.params.userId)
        // .populate('thoughts')
        .populate('friends', 'username');

      return res.json(user);
    } catch(err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  
  async updateUser (req, res) { // add user to user.friends by _id
    // Expect -> req.body: {'username': <string>, 'email': <string>}
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: ObjectId(req.params.userId)},
        { username: req.body.username, email: req.body.email},
        { new: true }
      ).populate('friends', 'username')
      //  .populate('thoughts')
      ;

      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async addFriend (req, res) { // add user to user.friends by _id
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: ObjectId(req.params.userId)},
        { $addToSet: { friends: ObjectId(req.params.friendId)}},
        { new: true }
      ).populate('friends', 'username')
      //  .populate('thoughts')
      ;

      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
};