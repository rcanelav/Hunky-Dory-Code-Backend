const { Router } = require('express');
const { check } = require('express-validator');
const { deleteAnswerById } = require('../controllers/answers/delete-answer-by-id.controller');
const { getAnswerById } = require('../controllers/answers/get-answer-by-id.controller');
const router = Router();
const {fieldValidator, validateJWT, authorshipValidator } = require('../middlewares/index.middlewares');

// Public Route
router.get('/:id', [
   check('id', 'Id is required.').not().isEmpty(),
   check('id', 'Invalid id').isNumeric(),
    fieldValidator
], getAnswerById );

// Private route
router.delete('/:id', [
    validateJWT,
    authorshipValidator,
    check('id', 'Answer id is required.').not().isEmpty(),
    check('id', 'Invalid answer id').isNumeric(),
    fieldValidator
], deleteAnswerById );

module.exports = router;