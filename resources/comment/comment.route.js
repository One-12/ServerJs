const express = require('express');
const commentController = require('./comment.controller');

// eslint-disable-next-line new-cap
const router = express.Router();

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
 * @typedef CommentRequest
 * @property {string} postId.required - post id.
 * @property {string} content.required - comment content
 * @property {string} parentId.required - incase of reply to a comment
 */

/**
 * Get comments for the given post id
 * @route GET /comments Get comments for the given post id.
 * @group Comments - Operations about Comments
 * @param {string} postId.query.required - post id.
 * @returns {Array.<Comment>} 200 - Comments array
 * @returns {Error}  default - Unexpected error
 */
router.get('/', commentController.getCommentsForPost);

/**
 * Create comments
 * @route POST /comments Create comment.
 * @group Comments - Operations about Comments
 * @param {CommentRequest.model} commentRequest.body.required - CommentRequest model.
 * @returns 200
 * @returns {Error}  default - Unexpected error
 */
router.post('/', commentController.createComment);

router.get('/isAlive', (req, res) => res.status(201).end());

module.exports = router;
