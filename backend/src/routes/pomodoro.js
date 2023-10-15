const {Router} = require('express');
const {validateProtectedRoute} = require('../middleware/auth-middlware');
const { startWork,endWork} = require('../controller/pomodoro-controller');

const router = new Router();

router.post('/start/:taskId',validateProtectedRoute,startWork);
router.post('/end/:taskId',validateProtectedRoute,endWork);

module.exports = router;