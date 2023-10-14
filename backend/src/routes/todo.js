const {Router} = require('express');
const {createTodo,removeTodoItem, updatetodoItem, findTodoItem,changeTaskSequence} = require('../controller/todo-controller');
const { validateProtectedRoute } = require('../middleware/auth-middlware');

const router = new Router();

router.post('/create',validateProtectedRoute,createTodo);
router.patch('/:todoId',validateProtectedRoute,updatetodoItem);
router.delete('/:todoId',validateProtectedRoute,removeTodoItem);
router.get('/',validateProtectedRoute,findTodoItem);
router.patch('/updateOrder/:groupId',validateProtectedRoute,changeTaskSequence);

module.exports = router;