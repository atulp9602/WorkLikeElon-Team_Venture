const { STATUS_CODES } = require("../utils/constant");

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async createOne(data) {
        try {
            const response = await this.model.create(data);
            return response;   
        } catch (error) {
            throw {
                statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
                message: error.message || "Some error occurred while creating the resource"
            }
        }
    }

    async bulkWrite(operations) {
        try {
            const result = await this.model.bulkWrite(operations);

            return result;
        } catch (error) {
            throw {
                statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
                message: error.message || `An error has occured while performing a bulk operation`,
            }
        }
    }

    async updateOne(id,data) {
        try {
            console.log(id);
            const response = await this.model.findByIdAndUpdate(id,data,{ new: true,runValidators: true });
            console.log(response);
            await response.save();
            return response;
        } catch (error) {
            throw {
                statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
                message: error.message || 'Some error occurred while updating the resource',
            }
        }
    }

    async findBy(filter) {
        try {
            const response = await this.model.findOne(filter);
            
            return response;
        } catch (error) {
            throw {
                statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
                message: error.message || 'Some error occurred while fetching resources',
            }
        }
    }

    async findAll(filter) {
        try {
            const response = await this.model.find(filter);
            return response;
        } catch (error) {
            throw {
                statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
                message: error.message || 'Some error occurred while fetching resources',
            }
        }
    }

    async delete(id) {
        try {
            const result = await this.model.findOneAndDelete(id);
            return result;
        } catch (error) {
            throw {
                statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
                message: error.message || "Error occured while deleting the resource",
            }
        }
    }
}

module.exports = CrudRepository;