const mongoose = require('mongoose');
const Todo = require('./todo');

const groupSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        require:true,
    },
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Todo'
    }],
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
},{timestamps:true});

groupSchema.pre('remove',async function(next){
    await this.model("Todo").deleteMany({'groupId':this._id});
    
    next();
})
const Group = mongoose.model('Group',groupSchema,'Group');

module.exports = Group;