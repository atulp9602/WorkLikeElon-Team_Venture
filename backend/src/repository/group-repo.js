const Group = require('../models/group');
const CrudRepository = require('./crud-repo');

class GroupRepository extends CrudRepository {
    constructor(){
        super(Group);
    }

    async findGroup(filter){
        try {
            const group = await Group.find(filter).populate({
                path:'todos',
            });

            return group;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = GroupRepository;