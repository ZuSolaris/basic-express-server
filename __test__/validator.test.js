
const { app } = require('../src/server.js');
const supertest = require('supertest');
const request = supertest(app);

describe('Validator', () => {
  it('handles name in query string ', async () => {
    const response = await request.get('/person?name=Zoe');

    expect(response.status).toBe(200);
    expect(response.text).toBeTruthy();
    expect(typeof(response)).toEqual('object');
  });
  });