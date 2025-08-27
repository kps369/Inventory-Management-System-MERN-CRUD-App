const request = require('supertest');
const express = require('express');
const router = require('./router');

const app = express();
app.use(express.json());
app.use(router);

describe('Product Routes', () => {
  it('should return 401 Unauthorized for GET /products without a token', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toEqual(401);
  });
});
