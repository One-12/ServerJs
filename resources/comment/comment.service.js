var commentSchema = require("./comment.entity");
var postSchema = require("../post/post.entity");
var addCommentValidator = require("./validators/add-comment.validator");

const commentsService = {
  getCommentsForPost: async postId => {
    const comments = await commentSchema.find({ postId: postId });
    return comments;
  },

  addComment: async comment => {
    await addCommentValidator
      .validate(comment)
      .then(async value => await processComment(comment))
      .catch(reason => {
        throw new Error(reason);
      });
  }
};

var processComment = async comment => {

  const isReply = comment.parentId;
  var createdComment = {};
  if (isReply) {
    const reply = { content: comment.content };
    createdComment = await commentSchema.findOneAndUpdate(
      { _id: comment.parentId },
      { $push: { replies: reply } }
    );
  } else {
    createdComment = await commentSchema.create(comment);
  }

  await postSchema.findOneAndUpdate(
    { _id: comment.postId },
    { $inc: { commentsCount: 1 } },
    { new: true }
  );

  return createdComment;
};

module.exports = commentsService;
