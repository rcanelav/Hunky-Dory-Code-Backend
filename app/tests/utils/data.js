const supertest = require('supertest');
const {app, sv} = require('../../../app');
const api = supertest(app);

// ASSETS 
const testImage = `app/tests/utils/assets/test.jpg`;
const testFile = `app/tests/utils/assets/text.txt`;

// USERS
const inactiveUser = 'inactiveUser@test.com';
const activeUser = 'activeUser@test.com';
const admin = 'admin@admin.com';

// TOKEN MANAGEMENT
let token = '';
function setToken( newToken ) {
    token = `Bearer ${newToken}`;
}
function getToken() {
    return token;
}

// LOGIN
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

// CREATE USER
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
    testImage,
    testFile
};