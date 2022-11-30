const { app } = require('../src/server.js');
const supertest = require('supertest');
const request = supertest(app);

describe('APIServer', () => {
  it('handles root path', async () => {
    const response = await request.get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBeTruthy();
    expect(response.text).toEqual('Hello World');
  });

  it('handles invalid requests', async () => {
    const response = await request.get('/foo');
    expect(response.status).toEqual(404);
  });

  it('handles errors', async () => {
    const response = await request.get('/bad');
    expect(response.status).toEqual(500);
    expect(response.body.route).toEqual('/bad');

  });

  it('works with query params and the "/PersonQuery" route', async () => {
    const response = await request.get('/person?name=Zoe');

    expect(response.text).toBeTruthy();
  })

});

