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

    async updateOne(data) {
        try {
            const response = await this.model.findOneAndUpdate({data},{new: true});

            return response;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CrudRepository;