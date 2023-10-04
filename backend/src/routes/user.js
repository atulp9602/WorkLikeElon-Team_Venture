const express = require('express');
const {signUp,signIn,userInfo,updatePassword,resetPassword} = require('../controller/user-controller');
const {validateProtectedRoute,checkCredentials} = require('../middleware/auth-middlware');

const router = express.Router();

router.post('/signup',checkCredentials,signUp);
router.post('/signin',checkCredentials,signIn);
router.post('/reset-password/',checkCredentials,validateProtectedRoute,updatePassword);
router.post('/forgot-password',checkCredentials,resetPassword);
router.post('/change-password',checkCredentials,validateProtectedRoute,updatePassword);
router.get('/user/me',validateProtectedRoute,userInfo);

module.exports = router;