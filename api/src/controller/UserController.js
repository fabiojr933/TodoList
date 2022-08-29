const User = require('../models/User');

class UserController {
    async store(req, res) {
        try {
            const data = {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password
            }           

            const user = await User.create(data);
            return res.status(201).json(user);

        } catch (error) {
            console.error(error);
            return res.status(400).json({
                'status': '400',
                'error': error.error
            });
        }
    }
    async index(req, res) {
        try {
            const users = await User.findAll();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(400).json({
                'status': '400',
                'error': 'no items found',
            });
        }
    }
    async findById(req, res) {
        try {
            const { id } = req.params;
            if (!id) throw new Validation('id is required');
            const users = await User.findAll({
                where: {
                    id: id
                }
            });
            return res.status(200).json(users);
        } catch (error) {
            return res.status(400).json({
                'status': '400',
                'error': error.error
            });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            if (!id) throw new Validation('id is required');
            const users = await User.destroy({
                where: {
                    id: id
                }
            });
            return res.status(200).json(users);
        } catch (error) {
            return res.status(400).json({
                'status': '400',
                'error': error.error
            });
        }
    }

    async update(req, res) {
        try {
            const data = {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
            }
           
            const { id } = req.params;
            if (!id) throw new Validation('id is required');
            const user = await User.update(data, {
                where: {
                    id: id
                },
                individualHooks: true
            });
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({
                'status': '400',
                'error': error.error
            });
        }
    }
}
module.exports = UserController;