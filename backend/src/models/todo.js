const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "completed"],
      default: "todo",
    },
    estimatedTime: {
        type: Number,
        default:0,
        required: true,
    },
    sequenceNo: {
        type:Number ,
        // required:true,
    },
    pomodoro: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pomodoro",
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

todoSchema.pre("remove", async function (next) {
  const group = await mongoose
    .model("Group")
    .findOneAndUpdate({ _id: this.groupId }, { $pull: { todos: this._id } });

  next();
});
todoSchema.pre('save', async function (next) {
    try {
        if (typeof this.sequenceNo !== 'number') {
            const highestTodo = await this.constructor.findOne().sort('-sequenceNo');
            const newSequenceNo = (highestTodo && highestTodo.sequenceNo ? highestTodo.sequenceNo : 0) + 1;
            this.sequenceNo = newSequenceNo;
        }
        next();
    } catch (error) {
        next(error);
    }
});

const Todo = mongoose.model("Todo", todoSchema, "Todo");

module.exports = Todo;
