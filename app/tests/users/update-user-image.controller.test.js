const { api, sv, getToken, login, testImage, activeUser, testFile } = require('../utils/data');

describe('Update user Img', () => {

    test('Should upload user image', async () => {
        await login( activeUser );

        const response = await api
            .put(`/api/v1/users/55/image`)
            .set('Authorization', getToken())
            .attach('profileImage', testImage)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect( response.body ).toEqual({
            "image": expect.any(String),
            "msg": expect.any(String),
        });
    });

    test('Should NOT upload - invalid file extension', async () => {

        const response = await api
            .put(`/api/v1/users/55/image`)
            .set('Authorization', getToken())
            .attach('profileImage', testFile)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect( response.body ).toEqual({
            "error": expect.any(String),
        });
    });

    test('Should NOT upload anothers user image', async () => {

        const response = await api
            .put(`/api/v1/users/1/image`)
            .set('Authorization', getToken())
            .attach('profileImage', testImage)
            .expect(404)
            .expect('Content-Type', /application\/json/);

        expect( response.body ).toEqual({
            "error": expect.any(String),
        });
    });

});

afterAll(() => {
    sv.close();
});
