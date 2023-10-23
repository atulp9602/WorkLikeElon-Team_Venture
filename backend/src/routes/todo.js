const {Router} = require('express');
const {createTodo,removeTodoItem, updatetodoItem, findTodoItem,changeTaskSequence, generateReport} = require('../controller/todo-controller');
const { validateProtectedRoute } = require('../middleware/auth-middlware');
const {validateTaskCreateRequest, validateTaskUpdateRequest, validateTaskDeleteRequest} = require('../middleware/todo-middlware');

const router = new Router();

router.post('/create',validateTaskCreateRequest,validateProtectedRoute,createTodo);
router.patch('/:todoId',validateTaskUpdateRequest,validateProtectedRoute,updatetodoItem);
router.delete('/:todoId',validateTaskDeleteRequest,validateProtectedRoute,removeTodoItem);
router.get('/',validateProtectedRoute,findTodoItem);
router.patch('/updateOrder/:groupId',validateProtectedRoute,changeTaskSequence);
router.patch('/updateOrder/',validateProtectedRoute,changeTaskSequence);
router.post('/generate-task-report',validateProtectedRoute,generateReport);

module.exports = router;