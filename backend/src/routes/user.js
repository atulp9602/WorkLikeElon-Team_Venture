const express = require('express');
const {signUp,signIn,userInfo} = require('../controller/user-controller');
const {validateProtectedRoute,checkCredentials} = require('../middleware/auth-middlware');

const router = express.Router();

router.post('/signup',checkCredentials,signUp);
router.post('/signin',signIn);
router.get('/user/me',validateProtectedRoute,userInfo);


module.exports = router;