const Validation = require('../middleware/Validation');
const Task = require('../models/Task');
const moment = require('moment');
const axios = require('axios')

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
                    userId: userId,
                    status: 'Pendente'
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

    
    async finished(req, res) {
        try {
            const userId = req.userId;
            const tasks = await Task.findAll({
                where: {
                    userId: userId,
                    status: 'Concluido'
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

    async alert(req, res) {

        var phone = '+556699539490';
        var token = '879852';
        var text = 'Ola Fabio, estou aqui para avisar que voce tem compromissora daqui a pouco';
        const task = await Task.findAll({
            where: {
                status: 'Pendente'
            }
        });
        console.log('********** entrou *********');
        console.log(task);

        task.map((v) => {

            var d1 = moment().format('YYYY-MM-DD HH:mm:ss');
            var d2 = moment(v.dataValues.alarm).format('YYYY-MM-DD HH:mm:ss');
            var diff = moment(d2, "YYYY-MM-DD HH:mm:ss").diff(moment(d1, "YYYY-MM-DD HH:mm:ss"));
            var Minutes = moment.duration(diff).asMinutes();
            var data = {
                status: 'Concluido'
            }
            if (Minutes <= 30 && Minutes >= 10) {
                Task.update(data, {
                    where: {
                        id: v.dataValues.id,
                    },
                    individualHooks: true
                });
                axios.post(`https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${text}&apikey=${token}`);
            }

        });

        res.status(200).json({
            Message: 'Alert send success'
        });
    }
}
module.exports = TaskController;

//https://www.npmjs.com/package/node-signalr
