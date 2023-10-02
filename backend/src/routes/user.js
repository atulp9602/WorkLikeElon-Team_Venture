const express = require('express');
const {signUp,signIn,userInfo} = require('../controller/user-controller');
const {validateProtectedRoute} = require('../middleware/auth-middlware');

const router = express.Router();

router.post('/signup',signUp);
router.post('/signin',signIn);
router.get('/user/me',validateProtectedRoute,userInfo);


module.exports = router;