const { Model, DataTypes } = require('sequelize');

class User extends Model {

    static init(sequelize) {
        super.init(
            {
                name: DataTypes.STRING,
                email: DataTypes.STRING,
                password: DataTypes.STRING,
            },
            {
                sequelize: sequelize,
                modelName: 'users'
            }
        );
    }
}
module.exports = User;