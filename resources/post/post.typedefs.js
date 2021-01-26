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
