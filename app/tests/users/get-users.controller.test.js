const { api, sv, getToken,  activeUser, login, admin } = require('../utils/data');

describe('Delete user user', () => {

    test('Should get users list', async () => {
        await login( admin );
        const response = await api
            .get(`/api/v1/users`)
            .set('Authorization', getToken())
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect( response.body ).toEqual({
            "totalPages": expect.any(Number),
            "results": expect.any(Array),
        });
        expect( response.body.results.length ).toBeGreaterThan(0);
    });

    test('Should not get user list - unauthorized', async () => {
        await login( activeUser );
        const response = await api
            .get(`/api/v1/users`)
            .set('Authorization', getToken())
            .expect(401)
            .expect('Content-Type', /application\/json/);

        expect( response.body ).toEqual({
            "error": expect.any(String),
        });
    });
    
});

afterAll(() => {
    sv.close();
});
