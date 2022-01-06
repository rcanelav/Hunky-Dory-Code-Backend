const { Router } = require('express');
const { check } = require('express-validator');
const { getTechnologies } = require('../controllers/technologies/get-technologies.controller');
const { getTechnologyById } = require('../controllers/technologies/get-technology-by-id.controller');
const { fieldValidator } = require('../middlewares/index.middlewares');

const router = Router();

router.get('/', getTechnologies );

router.get('/:id', [
    check('id', 'Invalid id.').isNumeric(),
    fieldValidator
], getTechnologyById );



module.exports = router;