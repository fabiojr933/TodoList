const User = require('../models/User');

class UserController {
    async store(req, res) {
        try {
            const { name, email, password } = req.body;
            const user = await User.create({
                name, email, password
            });
            return res.status(201).json(user);
        } catch (error) {
            return res.status(400).json({
                'status': '400',
                'Failure': error.name,
                'error': error.original.sql,
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
                'Failure': error.name,
                'error': error.original.sql,
            });
        }
    }
    async findById(req, res) {
        try {
            const { id } = req.params;
            const users = await User.findAll({
                where: {
                    id: id
                }
            });
            return res.status(200).json(users);
        } catch (error) {
            return res.status(400).json({
                'status': '400',
                'Failure': error.name,
                'error': error.original.sql,
            });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const users = await User.destroy({
                where: {
                    id: id
                }
            });
            return res.status(200).json(users);
        } catch (error) {
            return res.status(400).json({
                'status': '400',
                'Failure': error.name,
                'error': error.original.sql,
            });
        }
    }

    async update(req, res) {
        try {
            const data = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            }
            const { id } = req.params;
            const user = await User.update(data, {
                where: {
                    id: id
                }
            });
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({
                'status': '400',
                'Failure': error.name,
                'error': error.original.sql,
            });
        }
    }
}
module.exports = UserController;