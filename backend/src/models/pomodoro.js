const mongoose = require('mongoose');

const pomodoroSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo",
        // required: true,
    },
    workTime: {
        type: Number,
        required: true,
    },
    breakTime: {
        type: Number,
        required: true,
    },
    longBreakTime: {
        type: Number, 
        required: true,
    },
},{timestamps:true});

const Pomodoro = new mongoose.model('Pomodoro',pomodoroSchema);

module.exports = Pomodoro;