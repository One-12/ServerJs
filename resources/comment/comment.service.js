var commentSchema = require("./comment.entity");
var addCommentValidator = require("./validators/add-comment.validator");

exports.getCommentsForPost = async postId => {
  const comments = await commentSchema.find({ postId: postId });
  return comments;
};

exports.addComment = async comment => {
  const validPromise = await addCommentValidator.validate(comment);
  const isInValid = validPromise.some(isValid => !isValid);

  if (isInValid) {
    throw new Error("Validation failed for creating the comment");
  }

  console.log("valid request");
  const createdComment = await commentSchema.create(comment);

  console.log("valid comment created");
  return createdComment;
};
