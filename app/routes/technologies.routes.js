const { Router } = require('express');
const { check } = require('express-validator');
const { search } = require('../controllers/search/search.controller');
const { getTechnologies } = require('../controllers/technologies/get-technologies.controller');
const { isUserActive } = require('../helpers/db-validators');
const { fieldValidator } = require('../middlewares/field-validator');

const router = Router();

router.get('/', getTechnologies );



module.exports = router;