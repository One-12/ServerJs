const express = require('express');
const commentController = require('./comment.controller');

// eslint-disable-next-line new-cap
const router = express.Router();

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
