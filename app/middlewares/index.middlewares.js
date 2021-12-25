const fieldValidator = require('./field-validator');
const fileExtensionValidator  = require('./file-extension-validator');
const JWTValidator = require('./JWT-validator');
const passwordValidator = require('./password-validator');
const userRequestValidator = require('./user-request-validator');
const roleValidator = require('./role-validator');
const authorshipValidator = require('./authorship-validator');

module.exports = {
    ...fieldValidator,
    ...fileExtensionValidator,
    ...JWTValidator,
    ...passwordValidator,
    ...userRequestValidator,
    ...roleValidator,
    ...authorshipValidator,
};