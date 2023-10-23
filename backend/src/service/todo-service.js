const TodoRepository = require('../repository/todo-repo');
const GroupRepository = require('../repository/group-repo');
const {STATUS_CODES} = require('../utils/constant');
const Todo = require('../models/todo');
const moment = require('moment');

class TodoService 
{
    constructor() {
        this._todoRepository = new TodoRepository();
        this._groupRepository = new GroupRepository();
    }

    convertToISO8601 (dateString) {
      try {
          const formattedDate = moment(dateString, 'MM-DD-YYYY').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
          return formattedDate; 
      } catch (error) {
        throw {
          message: error.message,
          statusCode: STATUS_CODES['INTERNAL_SERVER_ERROR'],
        }
      }
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

    async generateTaskReport(userId,reportType,date) {
      try {
        let matchCriteria = {
          userId : userId,
        }
        if(!reportType || !date) {
          throw {
            message: "Please provide dates",
            statusCode:STATUS_CODES.BAD_REQUEST,
          }
        }
        if(reportType === 'daily') {
          matchCriteria.completedAt = {
            $gte:new Date(date),
            $lt: moment(date).add(1, 'day').toDate()
          };
        }
        else if(reportType === 'weekly') {
          matchCriteria.completedAt = {
            $gte: moment(date).startOf('week').toDate(),
            $lt: moment(date).endOf('week').toDate(),
          };
        }
        else if(reportType === 'monthly') {
          matchCriteria.completedAt = {
            $gte: moment(date).startOf('month').toDate(),
            $lt: moment(date).endOf('month').toDate(),
          }
        }
        const result = await this._todoRepository.generateReport(matchCriteria);
        return result;
      } catch (error) {
        throw({
          statuscode : error.statusCode|| STATUS_CODES.INTERNAL_SERVER_ERROR,
          message : error.message,
        });
      }
    }

    async updateTaskSequence(updatedTodoSequence) {
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