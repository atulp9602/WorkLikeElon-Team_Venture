const express = require('express');
const {create} = require('../controller/user-controller');

const router = express.Router();

router.post('/signup',create);

module.exports = router;