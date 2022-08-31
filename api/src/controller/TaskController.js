const Validation = require('../middleware/Validation');
const Task = require('../models/Task');
const moment = require('moment');

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

    async alert(req, res) {


        const task = await Task.findAll({
            where: {
                status: 'Pendente'
            }
        });

        task.map((v) => {

            const d1 = moment().format('YYYY-MM-DD HH:mm:ss')
            var d2 = v.dataValues.alarm;
            var diff = moment(d2, "YYYY-MM-DD HH:mm:ss").diff(moment(d1, "YYYY-MM-DD HH:mm:ss"));
            var Minutes = moment.duration(diff).asMinutes();

            /*
           var Days = moment.duration(diff).asDays();
           var Hours = moment.duration(diff).asHours();
            console.log(d2, d1)
             console.log(
                  Minutes,
                  Days,
                  Hours,
             )  
             console.log(typeof(Minutes))
             console.log(typeof(1));    */

            if (Minutes < 10) {
                // MANDAR MENSAGEM // PARA CLIENTE
                console.log(Minutes + 'Menor')
            }
        });





        res.status(200).json({

        });
    }
}
module.exports = TaskController;

//https://www.npmjs.com/package/node-signalr
/*
var today  = moment("Tue May 23 2016 09:00:00 GMT-0300 (BRT)");
var day = moment("Thu May 19 2016 05:00:00 GMT-0300 (BRT)");

var duracao = moment.duration(today.diff(day));
var horas = duracao.asHours();
console.log(horas)


 var diff = moment(d1, "YYYY-MM-DD HH:mm:ss").diff(moment(d2, "YYYY-MM-DD HH:mm:ss"));
            var Minutes = moment.duration(diff).asMinutes();
            var Days = moment.duration(diff).asDays();
            var Hours = moment.duration(diff).asHours();
            console.log(
                 Minutes,
                 Days,
                 Hours,
            )

*/