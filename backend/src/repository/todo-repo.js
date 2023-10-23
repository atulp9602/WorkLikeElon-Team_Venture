const Todo = require('../models/todo');
const CrudRepository = require('../repository/crud-repo');

class TodoRepository extends CrudRepository {
    constructor() {
        super(Todo)
    }
    // async findTodoBy(filter) {
    //     try {
    //         const response = await Todo.find({ filter: filter}).populate();
    //     } catch (error) {
            
    //     }
    // }

    async generateReport(matchCriteria) {
        try {
            // const report = await Todo.find(matchCriteria);
            // const report = await Todo.aggregate([
            //     {
            //         $match: matchCriteria
            //     },
            //     {
            //         $group: {
            //             _id: "$status",
            //             count: { $sum: 1 }
            //         }
            //     }
            // ]);
            const reportData = await Todo.find(matchCriteria);
            const groupedReport = reportData.reduce((result, item) => {
                if (!result[item.status]) {
                  result[item.status] = 0;
                }
                result[item.status]++;
                return result;
              }, {});
              
              const report = Object.entries(groupedReport).map(([status, count]) => ({
                _id: status,
                count,
              }));
            console.log(report);
            let finalReport = {

            };

            finalReport.NoofcompletedTask = report.find(data => data._id === 'completed')?.count || 0;
            finalReport.NoofuncompletedTask = report.find(data => data._id === 'todo')?.count || 0;
            finalReport.productivityScore = (finalReport.NoofcompletedTask / (finalReport.NoofcompletedTask + reportData.NoofuncompletedTask)) * 100 || 0;
            console.log(finalReport);

            return finalReport;
        } catch (error) {
            throw {
                message: error.message,
            }
        }
    }
};

module.exports = TodoRepository;