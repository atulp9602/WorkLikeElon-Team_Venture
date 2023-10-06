const express = require('express');
const userRoutes = require('./user');
const groupRoutes = require('./group');

const router = express.Router();

router.use('/',userRoutes);
router.use('/groups',groupRoutes);

module.exports = router;