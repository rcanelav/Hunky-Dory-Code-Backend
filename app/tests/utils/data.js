




const inactiveUser = 'inactiveUser@test.com';
const activeUser = 'activeUser@test.com';
let token = '';

function setToken( newToken ) {
    token = `Bearer ${newToken}`;
}

function getToken() {
    return token;
}

module.exports = {
    inactiveUser,
    activeUser,
    setToken,
    getToken,
};