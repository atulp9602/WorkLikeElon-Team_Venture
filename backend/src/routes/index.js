const express = require('express');
const userRoutes = require('./user');
const groupRoutes = require('./group');
const todoRoutes = require('./todo');

const router = express.Router();

router.use('/',userRoutes);
router.use('/groups',groupRoutes);
router.use('/todos',todoRoutes);

module.exports = router;