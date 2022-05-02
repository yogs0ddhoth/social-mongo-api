const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  async createThought (req, res) {
    try {
      const user = await Thought.create(req.body);
      // console.log(user);

      const updatedUser = await User.findOneAndUpdate(
        { username: user.username},
        { $addToSet: { thoughts: user._id}},
        { new: true }
      )
      //  .populate('friends', 'username')
      //  .populate('thoughts')
      ;
      console.log(updatedUser)
      return res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};