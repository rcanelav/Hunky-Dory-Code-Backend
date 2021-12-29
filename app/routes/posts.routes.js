const { Router } = require('express');
const { check } = require('express-validator');
const { getPostLikes } = require('../controllers/posts/get-post-likes.controller');
const { managePostLike } = require('../controllers/posts/set-post-like.controller');
const { isExistingPost } = require('../helpers/db-validators');
const { validateJWT, fieldValidator } = require('../middlewares/index.middlewares');

const router = Router();

// Public routes
router.get('/:id/likes', [
    check('id', 'Id is required.').not().isEmpty(),
    check('id', 'Invalid id').isNumeric(),
    check('id').custom( isExistingPost ),
    fieldValidator
], getPostLikes );

// Private routes
router.post('/:id/likes', [
    validateJWT,
    check('id', 'Answer id is required.').not().isEmpty(),
    check('id', 'Invalid answer id').isNumeric(),
    check('id').custom( isExistingPost ),
    fieldValidator
], managePostLike );

module.exports = router;
