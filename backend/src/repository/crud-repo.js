class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async createOne(data) {
        try {
            const response = await this.model.create(data);
            return response;   
        } catch (error) {
            throw error;
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
            console.log(error);
            throw error;
        }
    }

    async findBy(filter) {
        try {
            const response = await this.model.findOne(filter);
            
            return response;
        } catch (error) {
            throw error;
        }
    }

    async findAll(filter) {
        try {
            const response = await this.model.find(filter);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const result = await this.model.findOneAndDelete(id);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CrudRepository;