const {STATUS_CODES} = require('../utils/constant');
const ObjectId = require('mongoose').Types.ObjectId;

const validateTaskCreateRequest = (req, res, next) => {
    if (!req.body || !req.body.title || req.body.title === '' || !req.body.estimatedTime) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({message: 'missing required fields'});
    }
    next();
};

const validateTaskUpdateRequest = (req, res,next) => {
    console.log(req.body);
    if(!req.params.todoId || !Object.keys(req.body).length){
        return res.status(STATUS_CODES.NOT_FOUND).json({message:'missing required fields for updated task'});
    }
    if(!ObjectId.isValid(req.params.todoId)){
        return res.status(STATUS_CODES.BAD_REQUEST).json({message:"invalid task id"});
    }
    next();
}

const validateTaskDeleteRequest = (req, res,next) => {
    if(!req.params.todoId || !ObjectId.isValid(req.params.todoId)){
        return  res.status(STATUS_CODES.NOT_FOUND).json({message:'invalide task id'});
    }

    next();
}

module.exports = {
    validateTaskCreateRequest,
    validateTaskUpdateRequest,
    validateTaskDeleteRequest,
};