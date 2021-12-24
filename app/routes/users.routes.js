const { Router } = require('express');
const { check } = require('express-validator');
const { getUserProfile, getUsers, registerUser, updateUserImage, updateUserById, validateUserActivation, validateUserUpdates, updateUserRole, deleteUser, getUserAnwersById } = require('../controllers/users/index.controller');
const { isExistingEmail, isExistingUserById } = require('../helpers/db-validators');
const { fieldValidator, fileExtensionValidator, validateJWT, isPasswordMatching, userRequestValidator, isAdminRole, isValidRole } = require('../middlewares/index.middlewares');
const router = Router();


// Public endpoints
router.post( '/', [
    check('name', 'The name is required.').not().isEmpty(),
    check('lastname', 'The lastname is required.').not().isEmpty(),
    check('password', 'The password is required. At least 6 characters as minimum and 12 characters as maximum.').isLength({ min: 6, max: 12 }),
    check('email', 'Invalid email.').isEmail(),
    check('email').custom( isExistingEmail ),
    check('role', 'The role is required.').not().isEmpty(),
    check('role', 'Invalid role.').isIn(['STUDENT', 'EXPERT']),
    fieldValidator
], registerUser );

router.get( '/activation', validateUserActivation );

router.get( '/confirmation', validateUserUpdates );

router.get( '/:id',  getUserProfile );


// Private endpoints

router.get( '/', [
    validateJWT,
    isAdminRole,
    fieldValidator
],  getUsers );

router.put( '/:id', [
    validateJWT,
    check('id', 'Invalid id.').custom( isExistingUserById ),
    userRequestValidator,
    check('name', 'Insert a valid name').not().isEmpty(),
    check('lastname', 'Insert a valid lastname').isAlpha().not().isEmpty(),
    check('email', 'Invalid email.').isEmail(),
    check('image', 'Invalid image.').optional(),
    check('password', 'The password is required. At least 6 characters as minimum and 12 characters as maximum.').isLength({ min: 6, max: 12 }).optional(),
    check('repeatPassword', 'The repeat password is required.').custom( isPasswordMatching ), 
    fieldValidator
], updateUserById );

router.put( '/:id/image', [
    validateJWT,
    check('id', 'Id is required').not().isEmpty(),
    userRequestValidator,
    fileExtensionValidator,
    fieldValidator
], updateUserImage );

router.put( '/:id/role', [
    validateJWT,
    userRequestValidator,
    isValidRole( 'STUDENT', 'EXPERT', 'ADMIN' ),
    check('role', 'Invalid role.' ).isIn( ['STUDENT', 'EXPERT'] ),
    fieldValidator
], updateUserRole );

router.delete( '/:id', [
    validateJWT,
    check('id', 'Id is required').not().isEmpty(),
    userRequestValidator,
    fieldValidator
], deleteUser );

router.get( '/:id/answers', [
    check('id', 'Id is required').not().isEmpty(),
    check('page', 'Invalid Page').optional().custom( page => {
        if ( parseInt(page) > 0 ) return true;
    }),
    check('limit', 'Invalid limit').optional().custom( limit => {
        if ( parseInt(limit) > 0 ) return true;
    }),
    fieldValidator
], getUserAnwersById );

module.exports = router;