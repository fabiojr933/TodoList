const request = require('supertest');
const env = require('dotenv');
env.config();

var id = null;

test('must enter all parameters', () => {

  const data = {
    'name': Math.random().toString(10).substring(2),
    'email': Math.random().toString(10).substring(2) + '@gmail.com',
    'password': Math.random().toString(8).substring(2),
    'phone': Math.random(toString(12)),
  }

  return request(process.env.BASE_URL).post('/user').send(data).then(response => {
    expect(response.status).toBe(201);
    id = response._body.id;
  });
});

test('cant insert without name', () => {

  const data = {
    'email': Math.random().toString(10).substring(2),
    'password': Math.random().toString(8).substring(2),
    'phone': Math.random(toString(12)),
  }

  return request(process.env.BASE_URL).post('/user').send(data).then(response => {
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('name is required');
  });
});

test('cant insert without email', () => {
  const data = {
    'name': Math.random().toString(10).substring(2),
    'password': Math.random().toString(8).substring(2),
    'phone': Math.random(toString(12)),
  }
  return request(process.env.BASE_URL).post('/user').send(data).then(response => {
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('email is required');
  });
});

test('cant insert without password', () => {
  const data = {
    'name': Math.random().toString(10).substring(2),
    'email': Math.random().toString(10).substring(2) + '@gmail.com',
    'phone': Math.random(toString(12)),
  }
  return request(process.env.BASE_URL).post('/user').send(data).then(response => {
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('password is required');
  });
});

test('cant insert without phone', () => {
  const data = {
    'name': Math.random().toString(10).substring(2),
    'password': Math.random().toString(8).substring(2),
    'email': Math.random().toString(10).substring(2) + '@gmail.com',
  }
  return request(process.env.BASE_URL).post('/user').send(data).then(response => {
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('phone is required');
  });
});

test('list all users', () => {
  return request(process.env.BASE_URL).get('/user').then(response => {
    expect(response.status).toBe(200);
  });
});

test('list all users id', () => {
  return request(process.env.BASE_URL).get(`/user/${id}`).then(response => {
    expect(response.status).toBe(200);
  });
});

test('delete all users id', () => {
  return request(process.env.BASE_URL).put(`/user/${id}`).then(response => {
    expect(response.status).toBe(200);
  });
});