const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        // required: true,
    },
    status: {
        type:String ,
        enum: ['todo','in-progress','completed'],
        default:'todo',
    },
    estimatedTime: {
        hours: {
            type: Number,
            default:0,
            required: true,
            min: 0,
            max:24,
        },
        minutes: {
            type: Number,
            default:0,
            required: true,
            min: 0,
            max: 59
        }
    },
    groupId :{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Group',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, {timestamps: true});

todoSchema.pre('remove', async function(next) {
    const group = await mongoose.model('Group').findOneAndUpdate(
        { _id: this.groupId },
        { $pull: { todos: this._id } }
    );

    next();
});

const Todo = mongoose.model('Todo',todoSchema,'Todo');

module.exports = Todo;