const request = require('supertest');
const env = require('dotenv');
const moment = require('moment');
env.config();

var email = null;
var password = null;
var token = null;
var id = null;

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
    token = response._body.token;
    expect(response.status).toBe(200);
  });
});

test('must enter all parameters', async () => {
  const data = {
    'title': Math.random().toString(5).substring(2),
    'description': Math.random().toString(10).substring(2),
    'alarm': moment(),
  }
  return request(process.env.BASE_URL).post('/task').send(data).set('x-access-token', token).then(response => {
    expect(response.status).toBe(201);
  });
});

test('cant insert without title', async () => {
  const data = {
    'description': Math.random().toString(10).substring(2),
    'alarm': moment(),
  }
  return request(process.env.BASE_URL).post('/task').send(data).set('x-access-token', token).then(response => {
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('title is required');
  });
});

test('cant insert without alarm', async () => {
  const data = {
    'title': Math.random().toString(5).substring(2),
    'description': Math.random().toString(10).substring(2),
  }
  return request(process.env.BASE_URL).post('/task').send(data).set('x-access-token', token).then(response => {
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('alarm is required');
  });
});

test('updating the data', async () => {
  const data = {
    'title': Math.random().toString(9).substring(2),
    'description': Math.random().toString(5).substring(2),
  }
  return request(process.env.BASE_URL).put(`/task/${id}`).send(data).set('x-access-token', token).then(response => {
    expect(response.status).toBe(200);
  });
});

test('delete one task', async () => { 
  return request(process.env.BASE_URL).delete(`/task/${id}`).set('x-access-token', token).then(response => {
    expect(response.status).toBe(200);
  });
});

test('listing one task', async () => { 
  return request(process.env.BASE_URL).get(`/task/${id}`).set('x-access-token', token).then(response => {
    expect(response.status).toBe(200);
  });
});

test('listing all task', async () => { 
  return request(process.env.BASE_URL).get(`/task`).set('x-access-token', token).then(response => {
    expect(response.status).toBe(200);
  });
});