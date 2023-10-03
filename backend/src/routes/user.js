const express = require('express');
const {signUp,signIn,userInfo,createPassword} = require('../controller/user-controller');
const {validateProtectedRoute,checkCredentials} = require('../middleware/auth-middlware');

const router = express.Router();

router.post('/signup',checkCredentials,signUp);
router.post('/signin',signIn);
router.post('/create-password/',validateProtectedRoute,createPassword);
router.post('forgot-password',validateProtectedRoute,createPassword);
router.get('/user/me',validateProtectedRoute,userInfo);


module.exports = router;