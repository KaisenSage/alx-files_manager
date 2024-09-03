const request = require('supertest');
const app = require('../app');

describe('App', () => {
    it('should return 200 OK on the root route', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Welcome to the API');
    });
});

