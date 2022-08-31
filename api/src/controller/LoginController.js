const User = require('../models/User');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Validation = require('../middleware/Validation');

class LoginController {

    async Login(req, res) {
        var data = {};
        try {
            const user = await User.findOne({
                where: {
                    'email': req.body.email
                }
            });
            if(!user) throw new Validation('User does not exist');
            const { id, name, email, password } = user;
            if (bcrypt.compareSync(req.body.password, password)) {
                var token = jwt.sign({ id }, process.env.SECRET, {
                    expiresIn: 300000000 // expires in 5min
                });
                data = {
                    id: id,
                    name: name,
                    email: email,
                    token: token
                }
            } else {
                throw new Validation('incorrect password');
            }
            return res.status(200).json(data);

        } catch (error) {
            return res.status(401).json({
                'Error': error.error
            })
        }
    }
}

module.exports = LoginController;