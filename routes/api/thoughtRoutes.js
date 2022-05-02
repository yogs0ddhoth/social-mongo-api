const router = require('express').Router();
const {
  createThought
} = require('../../controllers/thoughtController');

// /thoughts
router.route('/')
  .post(createThought);

// /thoughts/:thoughtId/reactions
router.route('/:thoughtId')

module.exports = router;