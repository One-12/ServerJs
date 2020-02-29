var commentSchema = require("./comment.entity");
var postSchema = require("../post/post.entity");
var addCommentValidator = require("./validators/add-comment.validator");

const commentsService = {
  getCommentsForPost: async postId => {
    const comments = await commentSchema.find({ postId: postId });
    return comments;
  },

  addComment: async comment => {
    addCommentValidator
      .validate(comment)
      .then(async value => await processComment(comment))
      .catch(reason => {
        throw new Error(reason);
      });
  }
};

var processComment = async comment => {
  console.log("valid request");

  const isReply = comment.parentId;

  if (isReply) {
    const reply = { content: comment.content };
    await commentSchema.findOneAndUpdate(
      { _id: comment.parentId },
      { $push: { replies: reply } }
    );
  } else {
    const createdComment = await commentSchema.create(comment);

    console.log("valid comment created");
    return createdComment;
  }

  await postSchema.findOneAndUpdate(
    { _id: comment.postId },
    { $inc: { commentsCount: 1 } },
    { new: true }
  );
};

module.exports = commentsService;
