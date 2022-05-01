const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

module.exports = {
  async getUsers (req, res) {
    try {
      const users = await User.find()
        .populate('friends', '_id username email');

      return res.json(users);
    } catch (err) {
      console.log(err);

      return res.status(500).json(err);
    }
  },

  async addFriend (req, res) {
    console.log(req.params);
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: ObjectId(req.params.userId)},
        { $addToSet: { friends: ObjectId(req.params.friendId)}},
        { new: true }
      ).populate('friends', 'username');

      return res.json(updatedUser);
    } catch (err) {
      console.log(err);

      return res.status(500).json(err);
    }
  }
};