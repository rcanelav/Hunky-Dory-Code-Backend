const { Router } = require('express');
const { check } = require('express-validator');
const { getUserProfile } = require('../controllers/users/get-user-profile.controller');
const { getUsers } = require('../controllers/users/get-users.controller');
const registerUser = require('../controllers/users/register-user.controller');
const { updateUserImage } = require('../controllers/users/update-user-image');
const updateUserById = require('../controllers/users/update-user.controller');
const validateUserActivation = require('../controllers/users/user-activation.controller');
const validateUserUpdates = require('../controllers/users/user-changes-validation');
const { isExistingEmail, isExistingUserById } = require('../helpers/db-validators');
const { fieldValidator } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/JWT-validator');
const isPasswordMatching = require('../middlewares/password-validator');
const { isAdminRole, isValidRole } = require('../middlewares/role-validator');

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
    fieldValidator
], updateUserImage);



module.exports = router;