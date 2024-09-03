const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');

describe('Auth', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should register a new user', async () => {
        const res = await request(app).post('/api/auth/register').send({
            username: 'testuser',
            password: 'password123',
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'User registered successfully!');
    });

    it('should log in an existing user', async () => {
        const res = await request(app).post('/api/auth/login').send({
            username: 'testuser',
            password: 'password123',
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should return user profile when authenticated', async () => {
        const loginRes = await request(app).post('/api/auth/login').send({
            username: 'testuser',
            password: 'password123',
        });

        const token = loginRes.body.token;

        const res = await request(app).get('/api/auth/profile').set('Authorization', token);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('username', 'testuser');
    });
});

