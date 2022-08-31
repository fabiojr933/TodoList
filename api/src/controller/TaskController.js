const Validation = require('../middleware/Validation');
const Task = require('../models/Task');

class TaskController {
    async store(req, res) {
        try {
            const data = {
                title: req.body.title,
                description: req.body.description,
                alarm: req.body.alarm,
                userId: req.userId,
                status: 'Pendente'
            }
            const task = await Task.create(data);
            return res.status(201).json(task);
        } catch (error) {
            return res.status(400).json({
                'status': '400',
                'error': error.error
            });
        }
    }

    async index(req, res) {
        try {
            const userId = req.userId;
            const tasks = await Task.findAll({
                where: {
                    userId: userId
                }
            });
            return res.status(200).json(tasks);
        } catch (error) {
            return res.status(400).json({
                'status': '400',
                'error': error.error
            });
        }
    }


    async findById(req, res) {
        try {
            const { id } = req.params;
            const userId = req.userId;
            if (!id) throw new Validation('id is required');
            const tasks = await Task.findAll({
                where: {
                    id: id,
                    userId: userId
                }
            });
            return res.status(200).json(tasks);
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
            const userId = req.userId;
            if (!id) throw new Validation('id is required');
            const task = await Task.destroy({
                where: {
                    id: id,
                    userId: userId
                }
            });
            return res.status(200).json(task);
        } catch (error) {
            return res.status(400).json({
                'status': '400',
                'error': error.error
            });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const userId = req.userId;
            if (!id) throw new Validation('id is required');
            const data = {
                title: req.body.title,
                description: req.body.description,
                alarm: req.body.alarm,
                status: 'Pendente'
            }
            const task = await Task.update(data, {
                where: {
                    id: id,
                    userId: userId
                },
                individualHooks: true
            });
            return res.status(200).json(task);
        } catch (error) {
            return res.status(400).json({
                'status': '400',
                'error': error.error
            });
        }
    }
}
module.exports = TaskController;