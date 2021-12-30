const { inactiveUser, api, sv } = require('../utils/data');

describe(' Register user Controller ', () => {

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

            console.log(response.body)
            
        expect( response.body ).toEqual({
            "id": expect.any(Number),
            "msg": expect.any(String),
        });
    });

    test('Should NOT create a new user - Email already exists ', async () => {
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

    test('Should NOT create a new user - Name is required', async () => {
        const response = await api
            .post('/api/v1/users/')
            .send(
                {
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
                email: expect.any(Object),
                name: expect.any(Object)
            }
        });
    });
    test('Should NOT create a new user - Lastname is required', async () => {
        const response = await api
            .post('/api/v1/users/')
            .send(
                {
                    "name": "test",
                    "email": inactiveUser,
                    "password": "123456",
                    "role": "EXPERT"
                }
            )
            .expect(400)
            .expect('Content-Type', /application\/json/);    
        expect( response.body ).toEqual( {
            errors: {
                email: expect.any(Object),
                lastname: expect.any(Object)
            }
        });
    });
    test('Should NOT create a new user - Password is required', async () => {
        const response = await api
            .post('/api/v1/users/')
            .send(
                {
                    "name": "test",
                    "lastname": "test",
                    "email": inactiveUser,
                    "role": "EXPERT"
                }
            )
            .expect(400)
            .expect('Content-Type', /application\/json/);  
        expect( response.body ).toEqual( {
            errors: {
                email: expect.any(Object),
                password: expect.any(Object)
            }
        });
    });
    test('Should NOT create a new user - Password must have 6 char length MIN', async () => {
        const response = await api
            .post('/api/v1/users/')
            .send(
                {
                    "name": "test",
                    "lastname": "test",
                    "password": "123",
                    "email": inactiveUser,
                    "role": "EXPERT"
                }
            )
            .expect(400)
            .expect('Content-Type', /application\/json/);
        expect( response.body ).toEqual( {
            errors: {
                email: expect.any(Object),
                password: expect.any(Object)
            }
        });
    });
    test('Should NOT create a new user - Password must have 12 char length MAX', async () => {
        const response = await api
            .post('/api/v1/users/')
            .send(
                {
                    "name": "test",
                    "lastname": "test",
                    "password": "123123123123123123123",
                    "email": inactiveUser,
                    "role": "EXPERT"
                }
            )
            .expect(400)
            .expect('Content-Type', /application\/json/);
        expect( response.body ).toEqual( {
            errors: {
                email: expect.any(Object),
                password: expect.any(Object)
            }
        });
    });
    test('Should NOT create a new user - Role is required', async () => {
        const response = await api
            .post('/api/v1/users/')
            .send(
                {
                    "name": "test",
                    "lastname": "test",
                    "password": "123456",
                    "email": inactiveUser,
                }
            )
            .expect(400)
            .expect('Content-Type', /application\/json/);
        expect( response.body ).toEqual( {
            errors: {
                email: expect.any(Object),
                role: expect.any(Object)
            }
        });
    });
    test('Should NOT create a new user - Invalid Role', async () => {
        const response = await api
            .post('/api/v1/users/')
            .send(
                {
                    "name": "test",
                    "lastname": "test",
                    "password": "123456",
                    "email": inactiveUser,
                    "role": "ADMIN"
                }
            )
            .expect(400)
            .expect('Content-Type', /application\/json/);
        expect( response.body ).toEqual( {
            errors: {
                email: expect.any(Object),
                role: expect.any(Object)
            }
        });
    });
    
})
afterAll(() => {
    sv.close();
})