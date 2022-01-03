const { Router } = require('express');
const { check } = require('express-validator');
const { getPostLikes } = require('../controllers/posts/get-post-likes.controller');
const { managePostLike } = require('../controllers/posts/set-post-like.controller');
const { updatePostById } = require('../controllers/posts/update-post.controller');
const { isExistingPost } = require('../helpers/db-validators');
const { validateJWT, fieldValidator, postAuthorshipValidator } = require('../middlewares/index.middlewares');
const { getPosts } = require('../controllers/posts/get-posts.controller')
const { getPostById } = require('../controllers/posts/get-post-by-id.controller');
const router = Router();

// Public routes
router.get('/:id/likes', [
    check('id', 'Id is required.').not().isEmpty(),
    check('id', 'Invalid id').isNumeric(),
    check('id').custom( isExistingPost ),
    fieldValidator
], getPostLikes );

router.get("/", getPosts);

router.get("/:id", getPostById);

// Private routes
router.post('/:id/likes', [
    validateJWT,
    check('id', 'Answer id is required.').not().isEmpty(),
    check('id', 'Invalid answer id').isNumeric(),
    check('id').custom( isExistingPost ),
    fieldValidator
], managePostLike );

router.put(
    "/:id",
    [
      validateJWT,
      postAuthorshipValidator,
      check("id", "Answer id is required.").not().isEmpty(),
      check("id", "Invalid answer id").isNumeric(),
      check("id").custom(isExistingPost),
      check("title", "The title field is required.")
        .not()
        .isEmpty()
        .isLength({ min: 10, max: 8000 }),
      check("content", "The content field is required.")
        .not()
        .isEmpty()
        .isLength({ min: 10, max: 8000 }),
      fieldValidator,
    ],
    updatePostById
  );

module.exports = router;
