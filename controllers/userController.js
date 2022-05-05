const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = { // CRUD Operations:
  // Route: '/'
  async createUser (req, res) { // Expect -> req.body: {'username': <string>, 'email': <string>}
    try { // create single User
      const user = await User.create(req.body);

      return res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async getUsers (req, res) { 
    try { // get all users
      const users = await User.find();

      return res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  
  // Route: '/:userId'
  async getUser (req, res) { 
    try { // get single user and subdocuments by _id
      const user = await User.findById(req.params.userId)
        .populate('thoughts', 'thoughtText createdAt')
        .populate('friends', 'username');

      return res.json(user);
    } catch(err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async updateUser (req, res) { // Expect -> req.body: {'username': <string>, 'email': <string>}
    try { // add user to user.friends by _id
      const updatedUser = await User.findOneAndUpdate(
        { _id: ObjectId(req.params.userId) },
        { username: req.body.username, email: req.body.email },
        { new: true }
      );

      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async deleteUser (req, res) { 
    try { // delete single user by id
      const deletedUser = await User.findOneAndDelete({ _id: ObjectId(req.params.userId) });

      // delete all associated thoughts
      const deletedThoughts = await Thought.deleteMany({ user: ObjectId(req.params.userId) });

      // delete all instances of user in other users' 'friend' fields
      const userFriends = await User.find({ friends: ObjectId(req.params.userId) }, '_id');
      userFriends.forEach( async (user) => {
        await User.findByIdAndUpdate(
          { _id: user._id },
          { $pull: { friends: ObjectId(req.params.userId) } },
          { new: true }
        );
      });
      
      return res.json('Deleted');
    } catch(err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Route: '/:userId/friends/:friendId
  async addFriend (req, res) { 
    try { // add user to user.friends by _id
      const updatedUser = await User.findOneAndUpdate(
        { _id: ObjectId(req.params.userId) },
        { $addToSet: { friends: ObjectId(req.params.friendId) } },
        { new: true }
      );

      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async removeFriend (req, res) { 
    try { // add user to user.friends by _id
      const updatedUser = await User.findOneAndUpdate(
        { _id: ObjectId(req.params.userId) },
        { $pull: { friends: ObjectId(req.params.friendId) } },
        { new: true }
      ).populate('friends', 'username');

      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};