const router = require('express').Router();
const userRoutes = require('./userRoutes');


// Routes:
// /users
// /users/:userId/friends/:friendId
router.use('/users', userRoutes);
// /thoughts
// /thoughts/:thoughtId/reactions
module.exports = router;