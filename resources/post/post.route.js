const express = require('express');
const httpStatusCodes = require('http-status-codes');

const postController = require('./post.controller');
const authorize = require('../../middlewares/auth/auth.middleware');

const router = new express.Router();

/**
 * Returns if the API service is alive.
 * @route GET /isAlive Returns if the API service is alive.
 * @group Posts - Operations on Posts
 */
router.get('/isAlive', (req, res) => res.status(httpStatusCodes.OK).end());

/**
 * Get all posts
 * @route GET /posts Get available posts.
 * @group Posts - Operations on Posts
 * @param {integer} start.query.required - start index
 * @param {integer} limit.query.required - limit
 * @param {string} tag.query - 'tag' posts related to the tag.
 * @param {string} tag.page - 'page' posts related to the page.
 * @returns {Array.<Post>} 200 - An array of posts
 * @returns {Error}  default - Unexpected error
 */
router.get('/', postController.getPosts);

/**
 * Create new post.
 * @route POST /posts Create new post.
 * @group Posts - Operations on Posts
 * @param {PostRequest.model} post.body.required - PostRequest Model
 * @returns {Post.model} 200 - created post
 * @returns {Error}  default - Unexpected error
 */
router.post('/', authorize, postController.createPost);

/**
 * Get posts for the given post ids.
 * @route PUT /posts Get available posts.
 * @group Posts - Operations on Posts
 * @param {Array.<string>} PostIds.body.required - post ids
 * @returns {Array.<Post>} 200 - An array of posts
 * @returns {Error}  default - Unexpected error
 */
router.put('/', postController.getPostsByIds);

/**
 * Get user following posts
 * @route GET /posts/following Get posts of following user.
 * @group Posts - Operations on Posts
 * @param {integer} start.query.required - start index
 * @param {integer} limit.query.required - limit
 * @returns {Array.<Post>} 200 - An array of posts
 * @returns {Error}  default - Unexpected error
 */
router.get('/following', authorize, postController.getFollowingUserPosts);

/**
 * Get post for the given id
 * @route GET /posts/{postId} Get Post detail for the given id.
 * @group Posts - Operations on Posts
 * @param {string} postId.path.required - post id.
 * @returns {PostDetail.model} 200 - Post Detail
 * @returns {Error}  default - Unexpected error
 */
router.get('/:postId', postController.getPostById);

module.exports = router;
