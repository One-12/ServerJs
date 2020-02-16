var postSchema = require('../../post/post.entity');
var commentSchema = require('../comment.entity');

exports.validate = async function(commentRequest){
  const parentValidation = validateIsParent(commentRequest.parentId);
  const postValidation = validatePost(commentRequest.postId);

  return await Promise.all([parentValidation, postValidation]);
}

var validateIsParent = async function(parentId) {
  if (!parentId) {
    return Promise.resolve(true);
  }

  var parentComment = await commentSchema.findById(parentId);
  return !(parentComment && parentComment.parentId);
}

var validatePost = async function(postId) {
  if (!postId) {
    return Promise.resolve(false);
  }

  var post = await postSchema.findById(postId);
  return !!post;
}