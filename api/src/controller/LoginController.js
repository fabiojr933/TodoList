const User = require('../models/User');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

class LoginController {

    async Login(req, res) {
        var data = {};
        try {
            const user = await User.findOne({
                where: {
                    'email': req.body.email
                }
            });
            const { id, name, email, password } = user;
            if (bcrypt.compareSync(req.body.password, password)) {
                var token = jwt.sign({ email }, process.env.SECRET, {
                    expiresIn: 300 // expires in 5min
                });
                data = {
                    id: id,
                    name: name,
                    email: email,
                    token: token
                }
            }
            return res.status(200).json(data);

        } catch (error) {
            console.log(error)
            return res.status(401).json({
                'Error': 'No data found'
            })
        }
    }
}

module.exports = LoginController;