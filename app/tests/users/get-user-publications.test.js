const { api, sv } = require('../utils/data');

describe('Get User Publications ', () => {

    test('should get user posts', async () => {
        const response = await api
            .get('/api/v1/users/1/posts?page=1&limit=5')
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect( response.body ).toEqual({
            "totalPages": expect.any(Number),
            "results": expect.any(Array)
        });
    });

    test('should get user answers', async () => {
        const response = await api
            .get('/api/v1/users/1/answers?page=1&limit=5')
            .expect(200)
            .expect('Content-Type', /application\/json/);
        expect( response.body ).toEqual({
            "totalPages": expect.any(Number),
            "results": expect.any(Array)
        });
        expect( response.body.results).not.toHaveLength(0);
    });

    test('should get empty array - exceed pagination limit', async () => {
        const response = await api
            .get('/api/v1/users/1/posts?page=44&limit=5')
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect( response.body ).toEqual({
            "previous": expect.any(Object),
            "results": expect.any(Array),
            "totalPages": expect.any(Number),
        });
        expect( response.body.results ).toHaveLength(0);
    });

    test('should NOT get user posts - INVALID TYPE, NOT IN [POSTS, ANSWERS]', async () => {
        const response = await api
            .get('/api/v1/users/1/manzanas?page=44&limit=5')
            .expect(400)
            .expect('Content-Type', /application\/json/);
        expect( response.body ).toEqual({
            "errors": expect.any(Object)
        });
    });

    test('should NOT get user posts - INVALID LIMIT', async () => {
        const response = await api
            .get('/api/v1/users/1/manzanas?page=44&limit=-5')
            .expect(400)
            .expect('Content-Type', /application\/json/);
        expect( response.body ).toEqual({
            "errors": expect.any(Object)
        });
    });
    
    test('should NOT get user posts - INVALID PAGE', async () => {
        const response = await api
            .get('/api/v1/users/1/manzanas?page=-4&limit=5')
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
