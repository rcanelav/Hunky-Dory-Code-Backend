const supertest = require('supertest');
const {app, sv} = require('../../../app');
const { inactiveUser, activeUser, setToken } = require('../utils/data');
const api = supertest(app);

describe('Auth - login endpoint', () => {
    // Skipped because not mocked
    test.skip('Should create a new user ', async () => {
        const response = await api
            .post('/api/v1/users/')
            .send(
                {
                    "name": "test",
                    "lastname": "test",
                    "email": inactiveUser,
                    "password": "123456",
                    "role": "EXPERT"
                }
            )
            .expect(201)
            .expect('Content-Type', /application\/json/);
            
            expect( response.body ).toEqual({
                "id": expect.any(Number),
                "msg": expect.any(String),
            });
    });
    
    test('Should NOT create a new user ', async () => {
        const response = await api
            .post('/api/v1/users/')
            .send(
                {
                    "name": "Test",
                    "lastname": "test",
                    "email": inactiveUser,
                    "password": "123456",
                    "role": "EXPERT"
                }
            )
            .expect(400)
            .expect('Content-Type', /application\/json/);        
            expect( response.body ).toEqual( {
                errors: {
                  email: {
                    value: inactiveUser,
                    msg: `Email: ${inactiveUser} already exists.`,
                    param: 'email',
                    location: 'body'
                  }
                }
            });
    });
    
    test('Should login', async () => {
        const response = await api
            .post('/api/v1/auth/login')
            .send(
                {
                    "email": activeUser,
                    "password": "123456"
                }
            )
            .expect(200)
            .expect('Content-Type', /application\/json/);

        setToken( response.body.response.accessToken );
        expect( response.body ).toEqual({
                "response": {
                    "accessToken": expect.any(String)
                }
            });
    })
    
    test('Should NOT login', async () => {
        const response = await api
            .post('/api/v1/auth/login')
            .send(
                {
                    "email": activeUser,
                    "password": "1234567"
                }
            )
            .expect(403)
            .expect('Content-Type', /application\/json/);    
        expect( response.body ).toEqual({
                "error": expect.any(String)
        });
    });

    test('Inactive User Should NOT login', async () => {
        const response = await api
            .post('/api/v1/auth/login')
            .send(
                {
                    "email": inactiveUser,
                    "password": "123456"
                }
            )
            .expect(400)
            .expect('Content-Type', /application\/json/);    
        expect( response.body ).toEqual({
                "errors": expect.any(Object)
        });
    });
})

afterAll(() => {
    sv.close();
})
