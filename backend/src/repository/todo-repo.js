const Todo = require('../models/todo');
const CrudRepository = require('../repository/crud-repo');

class TodoRepository extends CrudRepository {
    constructor() {
        super(Todo)
    }
    // async findTodoBy(filter) {
    //     try {
    //         const response = await Todo.find({ filter: filter}).populate();
    //     } catch (error) {
            
    //     }
    // }
};

module.exports = TodoRepository;