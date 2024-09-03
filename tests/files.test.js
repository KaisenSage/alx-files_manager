const request = require('supertest');
const app = require('../app');

describe('Files', () => {
    it('should upload a file successfully', async () => {
        const res = await request(app)
            .post('/api/files/upload')
            .attach('file', 'path/to/testfile.jpg');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'File uploaded successfully!');
    });

    it('should download a file successfully', async () => {
        const res = await request(app).get('/api/files/download/testfile.jpg');
        expect(res.statusCode).toEqual(200);
        expect(res.header['content-type']).toEqual('image/jpeg');
    });
});

