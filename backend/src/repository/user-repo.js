const User = require('../models/user');
const CrudRepository = require('./crud-repo');

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }
};

module.exports  = UserRepository;