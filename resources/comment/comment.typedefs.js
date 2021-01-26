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
