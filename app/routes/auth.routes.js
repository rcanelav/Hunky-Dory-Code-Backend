const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth/login');
const { fieldValidator } = require('../middlewares/field-validator');

const router = Router();

router.post('/login', [
    check('email', 'Email is required.').not().isEmpty(),
    check('password', 'Password is required.').not().isEmpty(),
    fieldValidator
], login );

router.post('/google', [
    check('id_token', 'Google token is required.').not().isEmpty(),
    fieldValidator
], googleSignIn );


module.exports = router;