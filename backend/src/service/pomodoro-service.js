const {PomodoroRepository,TodoRepository} = require('../repository/index');

class PomodoroService {
    constructor() {
        this._pomodoroRepo = new PomodoroRepository();
        this._todoRepo = new TodoRepository();
    }
    async startTask(data) {
        try {
            const {userId,taskId,workTime,breakTime,longBreakTime} = data;
            // const task = await this._todoRepo.findBy({_id:taskId});
            const [task, pomodoro] = await Promise.all([
                this._todoRepo.findBy({ _id: taskId }),
                this._pomodoroRepo.findBy({ userId, workTime, breakTime, longBreakTime })
            ]);
            if(!task) {
                throw new Error("Task doesn't exists");
            }
            if(task.estimatedTime != workTime) {
                throw new Error('Estimated Time must be equal to workTime');
            }
            await this._todoRepo.updateOne({_id: taskId},{status:'in-progress'});
            if(!pomodoro) {
                let result = await this._pomodoroRepo.createOne({userId,taskId,workTime,breakTime,longBreakTime});
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async endTask(data) {
        try {
            const {taskId,isTaskCompleted} = data;
            const task = await this._todoRepo.findBy({_id:taskId});
            if(!task) {
                throw new Error("Task doesn't exists");
            }
            let status = 'completed';
            if(!isTaskCompleted){
                status='todo';
            }
            await this._todoRepo.updateOne({_id: taskId},{status:status});
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = PomodoroService;