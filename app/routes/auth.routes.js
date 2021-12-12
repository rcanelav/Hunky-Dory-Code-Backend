const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth/login');
const { isUserActive, isExistingEmail } = require('../helpers/db-validators');
const { fieldValidator } = require('../middlewares/field-validator');

const router = Router();

router.post('/login', [
    check('email', 'Inactive user. Please contact the administrator.').custom( isUserActive ),
    check('email', 'Email is required.').not().isEmpty(),
    check('password', 'Password is required.').not().isEmpty(),
    fieldValidator
], login );

router.post('/google', [
    check('id_token', 'Google token is required.').not().isEmpty(),
    fieldValidator
], googleSignIn );


module.exports = router;