var express = require('express');
var likeController = require('./like.controller');

var router = express.Router();

/**
 * @typedef LikeRequest
 * @property {string} id.required - comment id
 * @property {string} parentId - required incase of liking the reply
 */

/**
 * Like an entity.
 * @route PATCH /likes like an entity.
 * @group Likes - Operations about Likes
 * @param {enum} scope.query.required - Scope values that need to be considered for comment - eg: Comment,Post,ReplyComment
 * @param {LikeRequest.model} likeRequest.body.required - Like request
 * @returns {Post.model} 200 - created post
 * @returns {Error}  default - Unexpected error
 */
router.patch('/', likeController.likeEntity);

module.exports = router;