const { response } = require("express");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findUserById, setUserImage } = require("../../repositories/users.repository");
const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

async function updateUserImage (req, res = response) {
    try {
        const { id } = req.params;
        const { id: userId } = req.auth;
        
        if( userId !== Number(id) ) {
            throwJsonError(404, 'ID does not match.');
        }
        const userDB = await findUserById(id);
        if( !userDB ){
            return throwJsonError(404, 'User not found');
        }
        if(userDB.image){
            const pathNameArray = userDB.image.split('/');
            const imageName = pathNameArray[ pathNameArray.length - 1 ];
            const [ public_id ] = imageName.split('.');
            await cloudinary.uploader.destroy( public_id );
        }
        const { tempFilePath } = req.files.profileImage;
        const { secure_url } = await cloudinary.uploader.upload( tempFilePath, { 
            format: 'jpg',
            transformation: [
                { gravity: 'face' },
                { width: 300, crop: 'scale' },
                { format: 'jpg' },
            ],
        } );
        setUserImage( id, secure_url );

        res.status(200).json({
            msg: 'Image updated',
            image: secure_url,
        });
        
    } catch (error) {
        createJsonError(error, res);
    }
} 

module.exports = {
    updateUserImage
};