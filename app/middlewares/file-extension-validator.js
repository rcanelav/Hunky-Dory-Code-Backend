const createJsonError = require("../errors/create-json-error");
const throwJsonError = require("../errors/throw-json-error");


const fileExtensionValidator = (req, res, next) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0 || !req.files.profileImage) {
            throwJsonError(400, 'File is required.');
        }
    
        if( !req.files.profileImage.mimetype.includes('image')){
            throwJsonError(400, 'Invalid file type. Please, try to upload a valid image.');
        }
        next();
    } catch (error) {
        createJsonError(error, res);
    }
};

module.exports = {fileExtensionValidator};