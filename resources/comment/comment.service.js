var commentSchema = require("./comment.entity");
var addCommentValidator = require("./validators/add-comment.validator");

exports.getCommentsForPost = async postId => {
  const comments = await commentSchema.find({ postId: postId });
  return comments;
};

exports.addComment = async addCommentRequest => {
  const validPromise = await addCommentValidator.validate(comment);
  const isInValid = validPromise.some(isValid => !isValid);

  if (isInValid) {
    throw new Error("Validation failed for creating the comment");
  }

  const createdComment = await commentSchema.create(comment);
  return createdComment;
};
