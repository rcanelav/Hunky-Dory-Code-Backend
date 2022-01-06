const { Router } = require('express');
const { check } = require('express-validator');
const { createTechnology } = require('../controllers/technologies/create-technology.controller');
const { getTechnologies } = require('../controllers/technologies/get-technologies.controller');
const { getTechnologyById } = require('../controllers/technologies/get-technology-by-id.controller');
const { isExistingTechnologyByName } = require('../helpers/db-validators');
const { fieldValidator, isAdminRole, validateJWT } = require('../middlewares/index.middlewares');

const router = Router();

router.get('/', getTechnologies );

router.get('/:id', [
    check('id', 'Invalid id.').isNumeric(),
    fieldValidator
], getTechnologyById );

router.post('/', [
    validateJWT,
    isAdminRole,
    check('technology').custom( isExistingTechnologyByName ),
    fieldValidator
], createTechnology)



module.exports = router;