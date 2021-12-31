const supertest = require('supertest');
const {app, sv} = require('../../../app');
const api = supertest(app);


const inactiveUser = 'inactiveUser@test.com';
const activeUser = 'activeUser@test.com';
const admin = 'admin@admin.com';
let token = '';

function setToken( newToken ) {
    token = `Bearer ${newToken}`;
}

function getToken() {
    return token;
}

async function login( email, password = '123456' ) {
    const response = await api
        .post('/api/v1/auth/login')
        .send(
            {
                email,
                password,

            }
        );
    let userToken = '';
    if ( response.status === 200) {
       userToken = response.body.response.accessToken;
       setToken( userToken);
    }
    return response.body;
}

async function createUser( email = 'deleteUser@test.com', password = '123456', role = 'EXPERT') {
    const response = await api
        .post('/api/v1/users/')
        .send(
            {
                "name": "deleteUser",
                "lastname": "test",
                email,
                password,
                role
            }
        );
    return response.body;
}

module.exports = {
    admin,
    inactiveUser,
    activeUser,
    setToken,
    getToken,
    login,
    createUser,
    api,
    sv,
};