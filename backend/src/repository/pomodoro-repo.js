const Pomodoro = require('../models/pomodoro');
const CrudRepository = require('./crud-repo');

class PomodoroRepository extends CrudRepository {
    constructor() {
        super(Pomodoro);
    }
};

module.exports = PomodoroRepository;