const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = { // 'db.thoughts' CRUD Operations
  // Route: '/'
  async createThought (req, res) {
    try {
      const thought = await Thought.create(req.body);

      const updatedUser = await User.findOneAndUpdate(
        { _id: thought.user},
        { $addToSet: { thoughts: thought._id}},
        { new: true }
      ).populate('thoughts', 'thoughtText createdAt reactions');
       
      return res.json({thought, updatedUser});
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async getThoughts (req, res) {
    try {
      const thoughts = await Thought.find()
        .populate('user', '_id username')
        .populate('reactions', 'reactionBody username createdAt');

      return res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Route: '/:thoughtId'
  async getThought (req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId)
        .populate('reactions', 'reactionBody username createdAt');

      return res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async updateThought (req, res) { // Expect -> req.body: {'thoughText': <string>}
    try { // get thought by id and update
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: ObjectId(req.params.thoughtId) },
        { thoughtText: req.body.thoughtText },
        { new: true }
      ).populate('reactions', 'reactionBody username createdAt');

      return res.json(updatedThought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async deleteThought (req, res) { 
    try {
      const deletedThought = await Thought.findOneAndDelete({ _id: ObjectId(req.params.thoughtId) });
      console.log(deletedThought.user);
      const userThoughts = await User.findByIdAndUpdate(
        { _id: deletedThought.user },
        { $pull: { thoughts: ObjectId(req.params.thoughtId) } },
        { new: true }
      );

      return res.json(userThoughts);
    } catch(err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Route: '/:thoughtId/reactions'
  async addReaction (req, res) {}, 

  async deleteReaction (req, res) {
    try {
      const deletedThought = await Thought.deleteOne({ _id: ObjectId(req.params.userId)})

      return res.json(deletedThought);
    } catch(err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};