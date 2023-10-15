const TodoService = require('../service/todo-service');
const {STATUS_CODES} = require('../utils/constant');

const todoService = new TodoService();
module.exports = {
    async createTodo(req, res,) {
        try {
            const todoData = {...req.body};
            const userId = req.user.id;
            const response = await todoService.addTodoItem(todoData,userId);

            return res.status(STATUS_CODES.CREATED).json({
                success: true,
                data: response,
                message: "Successfully created a new todo item",
            });
        } catch (error) {
            return res.status(error.statusCode).json({
                sucess: false,
                data:{},
                message: error.message,
            });
        }
    },

    async updatetodoItem(req, res,) {
        try {
            const todoId = req.params.todoId;
            const userId = req.user.id;
            const response = await todoService.updateTodoItem(todoId, userId,{...req.body});

            return res.status(STATUS_CODES.OK).json({
                success: true,
                data:response,
                message:"Updated the todo successfully.",
            })
        } catch (error) {
            return res.status(error.statusCode).json({
                success: false,
                data:{},
                message:error.message,
            })
        }
    },

    async findTodoItem(req,res) {
        try {
            let filter = {
                userId:req.user.id,
                ...req.body,
            }
            if(filter.createdAt){
                const dateToFind = new Date(filter.createdAt);
                if(!isNaN(dateToFind.getTime())){
                    const startDate = new Date(dateToFind.getFullYear(), dateToFind.getMonth(), dateToFind.getDate(), 0, 0, 0, 0);
                    const endDate = new Date(dateToFind.getFullYear(), dateToFind.getMonth(), dateToFind.getDate(), 23, 59, 59, 999);
                    filter.createdAt = { $gte: startDate, $lte: endDate };                
                }
            }
            if(req.body.status) {
                filter.status = req.body.status;
            }
            const todo = await todoService.findTodo(filter);

            return res.status(STATUS_CODES.OK).json({
                success: true,
                data: todo,
                message: 'Successfully fetch all todos',
            })
        } catch (error) {
            return res.status(error.statusCode).json({
                success: false,
                data:{},
                message: error.message,
            })
        }
    },

    async changeTaskSequence(req,res){
        try {
            const {updatedTodoSequence} = {...req.body};
            // sourceIndex = Number(sourceIndex);
            // destinationIndex = Number(destinationIndex);
            // if(isNaN(sourceIndex) && isNaN(destinationIndex)) {
            //     throw new Error(`Invalid destination OR Source Index`);
            // }
            // console.log(updatedTodoSequence);
            const result = await todoService.updateTaskSequence(updatedTodoSequence);

            return res.status(STATUS_CODES.OK).json({
                success:true,
                data:result,
            })
        } catch (error) {
            return res.status(error.statusCode).json({
                success :false ,
                data:{} ,
                message:error.message,
            })
        }
    },
    
    async removeTodoItem(req, res) {
        try {
            const userId = req.user.id;
            const todoId = req.params.todoId;

            await todoService.removeTodoItem(todoId, userId);

            return res.status(STATUS_CODES.OK).json({
                success:true,
                data:{},
                message:"Successfully removed the todo item",
            })
        } catch (error) {
            return res.status(error.statusCode).json({
                success:false,
                data:{},
                message:error.message,
            });
        }
    }
}