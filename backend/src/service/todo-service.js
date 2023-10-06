const TodoRepository = require('../repository/todo-repo');
const GroupRepository = require('../repository/group-repo');

class TodoService {
    constructor() {
        this._todoRepository = new TodoRepository();
        this._groupRepository = new GroupRepository();
    }

    async addTodoItem(todoItems,userId) {
        try {
            const group = await this._groupRepository.findBy({_id:todoItems.groupId});
            if(!group) {
                throw new Error('No such group found');
            }
            const todo = await this._todoRepository.createOne({...todoItems,userId});
            group.todos.push(todo._id);
            group.save();

            return todo;
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }
    
    async removeTodoItem(todoId,userId) {
        try {
            const todo = await this._todoRepository.delete({_id:todoId,userId});
            if (!todo) {
                throw new Error("No item found");
            }
            return true;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async findTodo(filter) {
        try {
            console.log(filter);
            const todo = await this._todoRepository.findAll(filter);

            return todo;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateTodoItem(todoId,userId,todoData) {
        try {
            const todo = await this._todoRepository.updateOne({_id: todoId,userId:userId}, todoData);
            //if no todo is returned then the user has not access to that todo
            if(!todo) {
                throw new Error("no todo found");
            }
            return todo;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

module.exports = TodoService;