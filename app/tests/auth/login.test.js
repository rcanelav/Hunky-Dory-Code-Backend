const { inactiveUser, activeUser, setToken, api, sv } = require('../utils/data');

describe('Auth - login endpoint', () => {

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
    
    test('Should NOT login - Invalid Password', async () => {
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
                "error": 'Invalid user/password - password'
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
