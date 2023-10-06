const GroupRepository = require('../repository/group-repo');

class GroupService {
    constructor() {
        this._groupRepository = new GroupRepository();
    }
    
    async createGroup(groupData) {
        try {
            const group = await this._groupRepository.createOne(groupData);

            return group;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateGroup(groupData,groupId,userId) {
        try {
            const group = await this._groupRepository.updateOne({_id: groupId,userId:userId}, groupData);
            if (!group){
                throw new Error('No such group exists');
            }

            return group;
        } catch (error) {
            console.log(error.message);
            throw new Error(error.message);
        }
    }

    async findGroup(filter){
        try {
            const group = await this._groupRepository.findAll(filter);

            return group;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteGroup(groupId,userId) {
        try {
            const group = await this._groupRepository.delete({_id:groupId,userId:userId});
            if(!group) {
                throw new Error('No such group exists');
            }

            return true;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

module.exports = GroupService;