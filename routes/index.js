const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.all((req, res) => res.send('Wrong Route!'));

module.exports = router;