const { inactiveUser, activeUser, api, sv } = require('../utils/data');

describe('Get User Profile ', () => {
    test('Should get user profile', async () => {
        const response = await api
            .get('/api/v1/users/1')
            .expect(200)
            .expect('Content-Type', /application\/json/);        
        expect( response.body ).toEqual({
            "userData": expect.any(Object)
        });
    });
    test('Should get user not found', async () => {
        const response = await api
            .get('/api/v1/users/9999999999')
            .expect(404)
            .expect('Content-Type', /application\/json/);

        expect( response.body ).toEqual({
            "error": expect.any(String)
        });
    });
})

afterAll(() => {
    sv.close();
})
