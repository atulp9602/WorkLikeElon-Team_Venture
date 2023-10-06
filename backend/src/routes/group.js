const {Router} = require('express');
const {validateProtectedRoute} = require('../middleware/auth-middlware')
const {createGroup,updateGroup, deleteGroup, findGroup} = require('../controller/group-controller');

const router = Router();

router.post('/create',validateProtectedRoute,createGroup);
router.patch('/:groupId',validateProtectedRoute,updateGroup);
router.delete('/:groupId',validateProtectedRoute,deleteGroup);
router.get('/',validateProtectedRoute,findGroup);

module.exports = router;