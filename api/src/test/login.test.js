const request = require('supertest');
const env = require('dotenv');
const bcrypt = require("bcryptjs");
env.config();

var email = null;
var password = null;

test('saving a user', async () => {
    const data = {
        'name': Math.random().toString(10).substring(2),
        'email': Math.random().toString(10).substring(2) + '@gmail.com',
        'password': Math.random().toString(8).substring(2),
        'phone': Math.random(toString(12)),
    }
    email = data.email;
    password = data.password;
    return request(process.env.BASE_URL).post('/user').send(data).then(response => {
        expect(response.status).toBe(201);
        id = response._body.id;
    });

});

test('logging into the system', async () => {
    return request(process.env.BASE_URL).post('/login').send({ 'email': email, 'password': password }).then(response => {
        expect(response.status).toBe(200);
    });
});


test('cant login without password', async () => {
    return request(process.env.BASE_URL).post('/login').send({ email: email, password: 'senha errada' }).then(response => {
        expect(response.status).toBe(401);
        expect(response.body.Error).toBe('incorrect password');
    });
});

