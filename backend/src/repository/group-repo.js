const Group = require('../models/group');
const CrudRepository = require('./crud-repo');

class GroupRepository extends CrudRepository {
    constructor(){
        super(Group);
    }
};

module.exports = GroupRepository;