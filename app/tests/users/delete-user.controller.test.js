const { api, sv, getToken,  activeUser, login, createUser, admin } = require('../utils/data');

describe('Delete user user', () => {

    test('Should not be authorized to delete user - Not ADMIN nor self profile', async () => {
        // Login
         await login( activeUser );

        // Request to delete user
        const response = await api
            .delete(`/api/v1/users/1`)
            .set('Authorization', getToken())
            .expect('Content-Type', /application\/json/)
            .expect(404);
        expect( response.body ).toEqual({
            "error": expect.any(String)
        });
    });

    test('Should not find user to delete', async () => {
        const response = await api
            .delete('/api/v1/users/9999999999')
            .expect(403)
            .expect('Content-Type', /application\/json/);
        expect( response.body ).toEqual({
            "error": expect.any(String)
        });
        const responseWithoutId = await api
            .get('/api/v1/users/')
            .expect(403)
            .expect('Content-Type', /application\/json/);
        expect( responseWithoutId.body ).toEqual({
            "error": expect.any(String)
        });
    });

    test('Should delete user', async () => {
        
        await login( admin );
        await createUser();

        // Request to delete user
        const response = await api
            .delete(`/api/v1/users/1`)
            .set('Authorization', getToken())
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect( response.body ).toEqual({
            "msg": "User deleted successfully"
        });
    });
    
})

afterAll(() => {
    sv.close();
})
