const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = { // 'db.thoughts' CRUD Operations
  // Route: '/'
  async createThought (req, res) { 
    // expect -> req.body: {'thoughtText': <string>, 'user': <string>, 'username': <string>}
    try { // create single thought
      const thought = await Thought.create(req.body);

      // add thought to user as subdoc
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
    try { // get all thoughts and populate subdocs
      const thoughts = await Thought.find()
        .populate('user', '_id username')
        .populate('reactions', 'reactionBody username createdAt')
        .populate('reactions.user', '_id username');

      return res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Route: '/:thoughtId'
  async getThought (req, res) {
    try { // get single thought by _id and populate subdocs 
      const thought = await Thought.findById(req.params.thoughtId)
        .populate('reactions', 'reactionBody username createdAt')
        .populate('reactions.user', '_id username');

      return res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async updateThought (req, res) { // Expect -> req.body: {'thoughText': <string>}
    try { // get thought by _id and update thoughtText
          // return updated document with populated subdocs
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: ObjectId(req.params.thoughtId) },
        { thoughtText: req.body.thoughtText },
        { new: true }
      ).populate('reactions', 'reactionBody username createdAt')
       .populate('reactions.user', '_id username');

      return res.json(updatedThought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async deleteThought (req, res) { 
    try { // delete single thought by _id
      const deletedThought = await Thought.findOneAndDelete({ _id: ObjectId(req.params.thoughtId) });
      
      // remove associated subdoc from associated user
      const updatedUser = await User.findByIdAndUpdate(
        { _id: deletedThought.user },
        { $pull: { thoughts: ObjectId(req.params.thoughtId) } },
        { new: true }
      );

      return res.json({deletedThought, updatedUser});
    } catch(err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Route: '/:thoughtId/reactions'
  async addReaction (req, res) {
    try { // get single thought by _id and create subdoc in 'reactions' field
          // return updated thought with subdocs populated
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: ObjectId(req.params.thoughtId)},
        { $addToSet: { reactions: req.body } },
        { new: true }
      ).populate('reactions', 'user');

      return res.json(updatedThought);
    } catch(err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }, 
  async deleteReaction (req, res) {
    try { // remove reaction from associated parent doc
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: ObjectId(req.params.thoughtId)},
        { $pull: { reactions: {user: ObjectId(req.body.user)} } },
        { new: true }
      );

      return res.json(updatedThought);
    } catch(err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
};