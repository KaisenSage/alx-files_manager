const request = require('supertest');
const app = require('../app');

describe('Users', () => {
    it('should return a list of users', async () => {
        const res = await request(app).get('/api/users');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should return a specific user by ID', async () => {
        const res = await request(app).get('/api/users/123');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id', '123');
    });
});

