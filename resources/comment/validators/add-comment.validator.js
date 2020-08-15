const postSchema = require("../../post/post.entity");
const commentSchema = require("../comment.entity");

exports.validate = async function(commentRequest) {
  const parentValidation = validateIsParent(
    commentRequest.postId,
    commentRequest.parentId
  );
  const postValidation = validatePost(commentRequest.postId);
  return await Promise.all([parentValidation, postValidation]);
};

validateIsParent = async function(postId, parentId) {
  if (!parentId) {
    return Promise.resolve("valid comment");
  }
  const parentComment = await commentSchema.findById(parentId);
  if (parentComment && parentComment.postId == postId) {
    return Promise.resolve("valid comment");
  }
  return Promise.reject(new Error("invalid comment reply or invalid post reply"));
};

validatePost = async function(postId) {
  if (!postId) {
    return Promise.reject(new Error("postId is mandatory to create a comment"));
  }

  const post = await postSchema.findById(postId);
  if (!!post) {
    return Promise.resolve("valid comment");
  }
  return Promise.reject(new Error("post not found"));
};
