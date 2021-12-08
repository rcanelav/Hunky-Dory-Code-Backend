const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');

const router = Router();

// router.post('/login', [
//     check('email', 'El email es obligatorio').not().isEmpty(),
//     check('password', 'La contraseña es obligatoria').not().isEmpty(),
//     fieldValidator
// ], login );


module.exports = router;