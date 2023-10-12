const PomodoroService = require('../service/pomodoro-service');
const pomodoroService = new PomodoroService();

module.exports = {
    async startWork(req, res) {
        try {
            const pomodoroData = {
                userId: req.user.id,
                taskId:req.params.taskId,
                ...req.body,
            };
            await pomodoroService.startTask(pomodoroData);
    
            return res.status(200).json({
                success: true,
                data:{},
                message:'task started',
                error:{}
            });
    
        } catch (error) {
            return res.status(500).json({
                success: false,
                data:{},
                message:error.message,
                error,
            });
        }
    },

    async endWork(req, res) {
        try {
            const taskData = {
                userId: req.user.id,
                taskId:req.params.taskId,
                ...req.body,
            }

            await pomodoroService.endTask(taskData);

            return res.status(200).json({
                success:true,
                data:{},
                message: 'Task updated successfully',
                error:{},
            });
        } catch (error) {
            return res.status(500).json({
                success:false,
                data:{},
                message:error.message,
                error,
            })
        }
    }

}