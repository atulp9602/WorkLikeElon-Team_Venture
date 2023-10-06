const GroupService = require('../service/group-service');
const groupService = new GroupService();

module.exports = {
    async createGroup(req,res){
        try {
            const userId = req.user.id;
            const group = await groupService.createGroup({...req.body, userId});

            return res.status(201).json({
                success: true,
                data: group,
                message: 'Group created successfully',
                error:{},
            })
        } catch (error) {
            return res.status(500).json({
                success:false,
                data:{},
                message:error.message,
                error,
            })
        }
    },

    async updateGroup(req,res){
        try {
            const groupId = req.params.groupId;
            const userId = req.user.id;
            const group = await groupService.updateGroup({...req.body}, groupId,userId);

            return res.status(200).json({
                success: true,
                data: group,
                message: 'Group updated successfully',
                error:{},
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                data: {},
                message: error.message,
                error,
            })
        }
    },

    async findGroup(req,res) {
        try {
            let filter = {
                // _id: req.query._id || null,
                userId:req.user.id
            }
            if (req.query.name?.trim()) {
                filter.name = { $regex: `${req.query.name}`, $options: 'i' };
            }
            const group = await groupService.findGroup(filter);

            return res.status(200).json({
                success: true,
                data: group,
                message: 'Sucessfully fetched all groups',
                error:{},
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                data:{},
                message: error.message,
                error,
            })
        }
    },

    async deleteGroup(req,res){
        try {
            const userId = req.user.id;
            const groupId = req.params.groupId;
            await groupService.deleteGroup(groupId,userId);

            return res.status(200).json({
                success: true,
                data: {},
                message: 'Group deleted successfully',
                error:{},
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                data:{},
                message: error.message,
                error,
            })
        }
    }
};