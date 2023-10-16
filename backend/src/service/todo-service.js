const TodoRepository = require('../repository/todo-repo');
const GroupRepository = require('../repository/group-repo');
const {STATUS_CODES} = require('../utils/constant');
const Todo = require('../models/todo');

class TodoService 
{
    constructor() {
        this._todoRepository = new TodoRepository();
        this._groupRepository = new GroupRepository();
    }

    async addTodoItem(todoItems,userId) {
        try {
            todoItems.estimatedTime = Number(todoItems.estimatedTime);
            const group = await this._groupRepository.findBy({_id:todoItems.groupId});
            if(!group){
              throw {
                statusCode : STATUS_CODES['BAD_REQUEST'],
                message : 'Group not found',
              }
            }
            const todo = await this._todoRepository.createOne({
                ...todoItems,
                userId,
            });
            group.todos.push(todo._id);
            group.save();
      return todo;
    } catch (error) {
      console.log(error);
      throw {
        message: error.message,
        statusCode: error.statusCode || 500,
      }
    }
  }

  async removeTodoItem(todoId, userId) {
    try {
      const todo = await this._todoRepository.delete({ _id: todoId, userId });
      if (!todo) {
        // throw new Error("No item found");
        throw {
          message: "No item found",
          statusCode: STATUS_CODES['NOT_FOUND'],
        }
      }
      return true;
    } catch (error) {
      throw ({
        message: error.message,
        statusCode: error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR,
        })
    }
  }

  async findTodo(filter) {
    try {
      console.log(filter);
      const todo = await this._todoRepository.findAll(filter);

      return todo;
    } catch (error) {
      // throw new Error(error.message);
      throw({
        message : error.message ,
        statuscode : error.statusCode,
      })
    }
  }

  async updateTodoItem(todoId, userId, todoData) {
        try {
        const todo = await this._todoRepository.updateOne(
            { _id: todoId, userId: userId },
            todoData,
        );
        //if no todo is returned then the user has not access to that todo
        if (!todo) {
            throw{
              statusCode :STATUS_CODES["NOT_FOUND"],
              message:"no todo found",
            };
        }
        return todo;
        } catch (error) {
          throw({
            statuscode : error.statusCode|| STATUS_CODES.INTERNAL_SERVER_ERROR,
            message : error.message,
          });
        }
    }

    async updateTaskSequence(groupId,updatedTodoSequence) {
        try {
            const group = await this._groupRepository.findBy({_id: groupId});
            if(!group) {
                throw {
                  statusCode:STATUS_CODES.BAD_REQUEST,
                  message : 'Group not found',
                }
            }
            const bulkOps = updatedTodoSequence.map(updatedTask=>({
              updateOne:{
                filter: { _id: updatedTask._id },
                update: { $set: { sequenceNo: updatedTask.sequenceNo } },
                }
            }));

            const result = await this._todoRepository.bulkWrite(bulkOps);
            if (result.modifiedCount !== bulkOps.length) {
              throw ({
                statusCode : STATUS_CODES['INTERNAL_SERVER_ERROR'],
                message:'Failed to update some tasks',
              });
          }
        } catch (error) {
            throw ({
              statusCode : error.statusCode || STATUS_CODES['INTERNAL_SERVER_ERROR'],
              message:error.message,
            });
        }
    }
}

module.exports = TodoService;