const router = require('express').Router();
const {
  createThought, getThoughts, getThought, updateThought, deleteThought,
  addReaction, deleteReaction
} = require('../../controllers/thoughtController');

// /thoughts
router.route('/')
  .post(createThought).get(getThoughts);

// /thoughts/:thoughtId
router.route('/:thoughtId')
  .get(getThought).put(updateThought).delete(deleteThought);

// /thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(addReaction).delete(deleteReaction);
  
module.exports = router;