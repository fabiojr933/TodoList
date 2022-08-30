const { Model, DataTypes } = require('sequelize');
const Validation = require('../middleware/Validation');
const bcrypt = require("bcryptjs");
const moment = require('moment');

class User extends Model {

    static init(sequelize) {
        super.init(
            {
                name: DataTypes.STRING,
                email: DataTypes.STRING,
                password: DataTypes.STRING,
                phone: DataTypes.STRING,
                createdAt: DataTypes.DATE,
                updated_at: DataTypes.DATE,
            },
            {
                sequelize: sequelize,                  
                modelName: 'users',
                
                hooks: {
                    beforeCreate: (user) => {
                        if (!user.name) throw new Validation('name is required');
                        if (!user.email) throw new Validation('email is required');
                        if (!user.password) throw new Validation('password is required');
                        if(!user.phone) throw new Validation('phone is required');
                        const salt = bcrypt.genSaltSync(8);
                        user.password = bcrypt.hashSync(user.password, salt);
                        user.createdAt = moment();
                    },
                    beforeUpdate: (user) => {
                        if (!user.password) throw new Validation('password is required of update');
                        const salt = bcrypt.genSaltSync(8);
                        user.password = bcrypt.hashSync(user.password, salt);
                        user.updated_at = moment();
                    },
                },

                instanceMethods: {
                    validPassword: function (password) {
                        return bcrypt.compareSync(password, this.password);
                    }
                }
            }
        );       
    }
}
module.exports = User;