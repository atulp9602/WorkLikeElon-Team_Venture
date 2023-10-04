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
            const response = await this.model.findByIdAndUpdate(id,data,{ new: true,runValidators: true });
            
            return response;
        } catch (error) {
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
}

module.exports = CrudRepository;