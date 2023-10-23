const {PomodoroRepository,TodoRepository} = require('../repository/index');
const {STATUS_CODES} = require('../utils/constant');

class PomodoroService {
    constructor() {
        this._pomodoroRepo = new PomodoroRepository();
        this._todoRepo = new TodoRepository();
    }
    async startTask(data) {
        try {
            const {userId,taskId,workTime,breakTime,longBreakTime} = data;
            const [task, pomodoro] = await Promise.all([
                this._todoRepo.findBy({ _id: taskId }),
                this._pomodoroRepo.findBy({ userId, workTime, breakTime, longBreakTime })
            ]);
            if(!task) {
                // throw new Error("Task doesn't exists");
                throw {
                    message: "Task doesn't exist",
                    statusCode:STATUS_CODES.NOT_FOUND
                }
            }
            if(task.estimatedTime != workTime) {
                // throw new Error('Estimated Time must be equal to workTime');
                throw {
                    message: "Estimated Time must be equal to workTime",
                    statusCode: STATUS_CODES.BAD_REQUEST,
                }
            }
            await this._todoRepo.updateOne({_id: taskId},{status:'in-progress'});
            if(!pomodoro) {
                let result = await this._pomodoroRepo.createOne({userId,taskId,workTime,breakTime,longBreakTime});
            }
        } catch (error) {
            throw ({
                statusCode:error.statusCode || STATUS_CODES['INTERNAL_SERVER_ERROR'],
                message: error.message,
            });
        }
    }

    async endTask(data) {
        try {
            const currentDate = new Date();
            const {taskId,isTaskCompleted} = data;
            const task = await this._todoRepo.findBy({_id:taskId});
            if(!task) {
                throw {
                    statusCode:STATUS_CODES.NOT_FOUND,
                    message: "Task does not exist"
                }
            }
            // let status = 'completed';
            // if(!isTaskCompleted){
            //     status='todo';
            // }
            // await this._todoRepo.updateOne({_id: taskId},{status:status});
            const updatedTask = await this._todoRepo.updateOne(
                {_id:taskId},
                {
                    $set:{
                        status:isTaskCompleted ? 'completed' : 'todo',
                        completedAt:isTaskCompleted ? currentDate : null,
                    },
                }
            );
        } catch (error) {
            throw ({
                statusCode:error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR,
                message:error.message,
            });
        }
    }
}

module.exports = PomodoroService;