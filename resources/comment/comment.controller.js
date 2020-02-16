var commentService = require('./comment.service');
var httpStatusCodes = require('http-status-codes');

exports.getCommentsForPost = async (req, res) => {
  try {
    const comments = await commentService.getCommentsForPost(req.query.postId);
    return res.status(httpStatusCodes.OK).json({ comments });
  } catch (err) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({
      error: err.message
    });
  } 
}

exports.createComment = async (req, res) => {
  try {
    const createCommentRequest = req.body;
    const createdComment = await commentService.addComment(
      createCommentRequest
    );
    return res.status(httpStatusCodes.CREATED).json({ createdComment });
  } catch (err) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({
      error: err.message
    });
  }
}
