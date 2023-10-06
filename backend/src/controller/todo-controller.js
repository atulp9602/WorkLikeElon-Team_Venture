const TodoService = require('../service/todo-service');

const todoService = new TodoService();
module.exports = {
    async createTodo(req, res,) {
        try {
            const todoData = {...req.body};
            const userId = req.user.id;
            const response = await todoService.addTodoItem(todoData,userId);

            return res.status(200).json({
                success: true,
                data: response,
                message: "Successfully created a new todo item",
                error:{},
            });
        } catch (error) {
            return res.status(500).json({
                sucess: false,
                data:{},
                message: error.message,
                error,
            });
        }
    },

    async updatetodoItem(req, res,) {
        try {
            const todoId = req.params.todoId;
            const userId = req.user.id;
            const response = await todoService.updateTodoItem(todoId, userId,{...req.body});

            return res.status(200).json({
                success: true,
                data:response,
                message:"Updated the todo successfully.",
                error:{},
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                data:{},
                message:error.message,
                error:error,
            })
        }
    },

    async findTodoItem(req,res) {
        try {
            let filter = {
                userId:req.user.id,
            }
            if(req.body.groupId) {
                filter.groupId = req.body.groupId;
            }
            if(req.body.status) {
                filter.status = req.body.status;
            }
            const userId=req.user.id;
            const todo = await todoService.findTodo(filter);

            return res.status(200).json({
                success: true,
                data: todo,
                message: 'Successfully fetch all todos',
                error:{},
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                data:{},
                message: error.message,
                error:{},
            })
        }
    },
    
    async removeTodoItem(req, res) {
        try {
            const userId = req.user.id;
            const todoId = req.params.todoId;

            await todoService.removeTodoItem(todoId, userId);

            return res.status(200).json({
                success:true,
                data:{},
                message:"Successfully removed the todo item",
                error:{},
            })
        } catch (error) {
            return res.status(500).json({
                success:false,
                data:{},
                message:error.message,
                error,
            });
        }
    }
}