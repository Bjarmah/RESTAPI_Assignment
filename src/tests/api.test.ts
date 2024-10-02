const request = require('supertest');
const app = require('../app');

describe('API Tests', () => {
    it('should create a new user', async () => {
        const res = await request(app)
            .post('/users')
            .send({
                username: 'testuser',
                email: 'test@example.com'
            });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
    });

    it('should get all users', async () => {
        const res = await request(app).get('/users');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBeTruthy();
    });
});