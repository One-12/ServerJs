var postService = require("../post/post.service"),
  commentService = require("../comment/comment.service"),
  httpStatusCodes = require("http-status-codes");

const likeController = {
  likeEntity: async (req, res) => {
    try {
      const scope = req.query.scope;
      console.log(scope === "ReplyComment");
      switch (scope) {
        case "Comment":
          await commentService.likeComment(req.body);
          break;
        case "Post":
          await postService.likePost(req.body);
          break;
        case "ReplyComment":
          await commentService.likeReply(req.body);
          break;
        default:
          return res.status(httpStatusCodes.BAD_REQUEST).json({
            error: 'Invalid scope'
          });
      }
      return res.status(httpStatusCodes.OK).json({});
    } catch (err) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        error: err.message
      });
    }
  }
};

module.exports = likeController;
