const { Router } = require('express');
const { check } = require('express-validator');
const registerUser = require('../controllers/users/register-user.controller');
const validateUserActivation = require('../controllers/users/user-activation.controller');
const { isExistingEmail } = require('../helpers/db-validators');
const { fieldValidator } = require('../middlewares/field-validator');

const router = Router();

router.post( '/', [
    check('name', 'The name is required.').not().isEmpty(),
    check('lastname', 'The lastname is required.').not().isEmpty(),
    check('password', 'The password is required. At least 6 characters as minimum and 12 characters as maximum.').isLength({ min: 6, max: 12 }),
    check('email', 'Invalid email.').isEmail(),
    check('email').custom( isExistingEmail ),
    check('role', 'The role is required.').not().isEmpty(),
    check('role', 'Invalid role.').isIn(['USER', 'EXPERT']),
    fieldValidator
], registerUser );

router.get( '/activation', validateUserActivation );


module.exports = router;