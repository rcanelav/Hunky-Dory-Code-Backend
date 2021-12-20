
const getUserProfile = require('./get-user-profile.controller');
const getUsers = require('./get-users.controller');
const registerUser = require('./register-user.controller');
const updateUserImage = require('./update-user-image.controller');
const updateUserById = require('./update-user.controller');
const validateUserActivation = require('./user-activation.controller');
const validateUserUpdates = require('./user-changes-validation.controller');

module.exports = {
    ...getUserProfile,
    ...getUsers,
    ...registerUser,
    ...updateUserImage,
    ...updateUserById,
    ...validateUserActivation,
    ...validateUserUpdates
}