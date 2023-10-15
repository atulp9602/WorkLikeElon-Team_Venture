const {Router} = require('express');
const {createTodo,removeTodoItem, updatetodoItem, findTodoItem,changeTaskSequence} = require('../controller/todo-controller');
const { validateProtectedRoute } = require('../middleware/auth-middlware');
const {validateTaskCreateRequest, validateTaskUpdateRequest, validateTaskDeleteRequest} = require('../middleware/todo-middlware');

const router = new Router();

router.post('/create',validateTaskCreateRequest,validateProtectedRoute,createTodo);
router.patch('/:todoId',validateTaskUpdateRequest,validateProtectedRoute,updatetodoItem);
router.delete('/:todoId',validateTaskDeleteRequest,validateProtectedRoute,removeTodoItem);
router.get('/',validateProtectedRoute,findTodoItem);
router.patch('/updateOrder/',validateProtectedRoute,changeTaskSequence);

module.exports = router;