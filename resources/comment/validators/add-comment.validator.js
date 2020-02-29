var postSchema = require("../../post/post.entity");
var commentSchema = require("../comment.entity");

exports.validate = async function(commentRequest) {
  const parentValidation = validateIsParent(
    commentRequest.postId,
    commentRequest.parentId
  );
  const postValidation = validatePost(commentRequest.postId);
  return await Promise.all([parentValidation, postValidation]);
};

var validateIsParent = async function(postId, parentId) {
  if (!parentId) {
    return Promise.resolve("valid comment");
  }
  var parentComment = await commentSchema.findById(parentId);
  if (parentComment && parentComment.postId == postId) {
    return Promise.resolve("valid comment");
  }
  return Promise.reject("invalid comment reply or invalid post reply");
};

var validatePost = async function(postId) {
  if (!postId) {
    return Promise.reject("postId is mandatory to create a comment");
  }

  var post = await postSchema.findById(postId);
  if (!!post) {
    return Promise.resolve("valid comment");
  }
  return Promise.reject("post not found");
};
