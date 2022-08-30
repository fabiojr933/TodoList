const { Model, DataTypes } = require('sequelize');
const Validation = require('../middleware/Validation');
const moment = require('moment');

class Task extends Model {

    static init(sequelize) {       
        
        super.init(
            {
                title: DataTypes.STRING,
                description: DataTypes.STRING,
                date: DataTypes.DATE,
                alarm: DataTypes.STRING,
                status: DataTypes.STRING,
                createdAt: DataTypes.DATE,
                updated_at: DataTypes.DATE,
            },
            {
                sequelize: sequelize,
                modelName: 'tasks',
               
                hooks: {
                    beforeCreate: (task) => {
                        if (!task.title) throw new Validation('title is required');
                        if (!task.date) throw new Validation('date is required');
                        if (!task.alarm) throw new Validation('alarm is required');
                        if (!task.userId) throw new Validation('userId is required');

                    },
                    beforeUpdate: (task) => {
                        task.updated_at = moment();
                    },
                },                
            },
        );
    }
}
module.exports = Task;