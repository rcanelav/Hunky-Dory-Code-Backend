const {
  createNewPost,
} = require("../controllers/posts/create.new.post.controller");
const { validateJWT } = require("../middlewares/JWT-validator");
const { check } = require("express-validator");
const { Router } = require("express");
const { fieldValidator } = require("../middlewares/field-validator");
const {
  getAllPosts,
} = require("../controllers/posts/get.all.posts.controller");
const { isAdminRole } = require("../middlewares/role-validator");
const {
  getPostById,
} = require("../controllers/posts/get.posts.by.id.controller");

const router = Router();

router.get(
  "/",
  [
    // validateJWT,
    // check("id", "Invalid id.").custom(isExistingUserById),
    // isAdminRole,
  ],
  getAllPosts
);

router.get(
  "/:id",
  [
    // validateJWT,
    // check("id", "Invalid id.").custom(isExistingUserById),
  ],
  getPostById
);

router.post(
  "/newpost",
  [
    // validateJWT,
    // check("id", "Invalid id.").custom(isExistingUserById),
    check("title", "The title field is required.")
      .not()
      .isEmpty()
      .isLength({ min: 10, max: 120 }),
    check("content", "The content field is required.")
      .not()
      .isEmpty()
      .isLength({ min: 10, max: 2000 }),
    check("tech", "The tech field is required.")
      .not()
      .isEmpty()
      .isLength({ min: 1, max: 15 }),
    fieldValidator,
  ],
  createNewPost
);

module.exports = router;
