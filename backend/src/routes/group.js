const {Router} = require('express');
const {validateProtectedRoute} = require('../middleware/auth-middlware')
const {createGroup,updateGroup, deleteGroup, findGroup,findTodoWithGroup} = require('../controller/group-controller');

const router = Router();

router.post('/create',validateProtectedRoute,createGroup);
router.patch('/:groupId',validateProtectedRoute,updateGroup);
router.delete('/:groupId',validateProtectedRoute,deleteGroup);
router.get('/',validateProtectedRoute,findGroup);
router.get('/:groupId',validateProtectedRoute,findTodoWithGroup);

module.exports = router;