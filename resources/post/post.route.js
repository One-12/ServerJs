var express = require("express");
var postController = require("./post.controller");
const isAuthorized = require("../../middlewares/firebase.middleware");
var router = express.Router();

/**
 * @typedef Reply
 * @property {string} id - comment id
 * @property {string} content - reply comment content
 * @property {integer} likesCount - like count
 */
/**
 * @typedef Comment
 * @property {string} id - comment id
 * @property {string} postId - post id.
 * @property {string} content - comment content
 * @property {integer} likesCount - like count
 * @property {Array.<Reply>} replies - replies
 */
/**
 * @typedef PostDetail
 * @property {string} id - post id
 * @property {integer} views - view count
 * @property {integer} points - point to the post
 * @property {integer} commentsCount - comment count
 * @property {Array.<string>} tags - tags for the post
 * @property {integer} likesCount - like count
 * @property {string} content - post content
 * @property {string} title - post title
 * @property {string} type - post type
 * @property {Array.<Comment>} comments - comments
 */

/**
 * @typedef Post
 * @property {string} id - post id
 * @property {integer} views - view count
 * @property {integer} points - point to the post
 * @property {integer} commentsCount - comment count
 * @property {Array.<string>} tags - tags for the post
 * @property {integer} likesCount - like count
 * @property {string} content - post content
 * @property {string} title - post title
 * @property {string} type - post type
 */

/**
 * @typedef PostRequest
 * @property {string} content.required - post content
 * @property {string} title.required - post title
 * @property {string} type.required - post type
 * @property {Array.<string>} tags
 */

/**
 * Get all posts
 * @route GET /posts Get available posts.
 * @group Posts - Operations about Posts
 * @param {integer} start.query.required - start index
 * @param {integer} limit.query.required - limit
 * @returns {Array.<Post>} 200 - An array of posts
 * @returns {Error}  default - Unexpected error
 */
router.get("/", isAuthorized, postController.getPosts);

/**
 * Get post for the given id
 * @route GET /posts/{postId} Get Post detail for the given id.
 * @group Posts - Operations about Posts
 * @param {string} postId.path.required - post id.
 * @returns {PostDetail.model} 200 - Post Detail
 * @returns {Error}  default - Unexpected error
 */
router.get("/:postId", postController.getPostById);

/**
 * Get posts for the given post ids.
 * @route PUT /posts Get available posts.
 * @group Posts - Operations about Posts
 * @param {Array.<string>} PostIds.body.required - post ids
 * @returns {Array.<Post>} 200 - An array of posts
 * @returns {Error}  default - Unexpected error
 */
router.put("/", postController.getPostsByIds);

/**
 * Create new post.
 * @route POST /posts Create new post.
 * @group Posts - Operations about Posts
 * @param {PostRequest.model} post.body.required - PostRequest Model
 * @returns {Post.model} 200 - created post
 * @returns {Error}  default - Unexpected error
 */
router.post("/", isAuthorized, postController.createNewPost);
router.post("/_fake", postController.createFakePosts);
router.get("/isAlive", (req, res) => res.status(201).end());

module.exports = router;
