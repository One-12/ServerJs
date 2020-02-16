var postSchema = require("./post.entity");
var queueService = require("../queue/queue.service");
var mongoose = require('mongoose');
var config = require("../../config.json");

exports.getPosts = async function(start, limit) {
  const posts = await postSchema
    .find({})
    .skip(start)
    .limit(limit);
  return posts;
};

exports.getPostById = async function(postId) {
  const result = await postSchema.aggregate([
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "postId",
        as: "comments"
      }
    },
    { $match: { _id: mongoose.Types.ObjectId(postId) } }
  ]);

  return result;
};

exports.getPostByIds = async function(postIds) {
  const posts = await postSchema.find({ _id: { $in: postIds } });
  return posts;
};

exports.createPost = async function(postRequest) {
  const createdPost = await postSchema.create(postRequest);
  pushTags(postRequest);
  return createdPost;
};

var pushTags = function(postRequest) {
  const tags = postRequest.tags;
  if (tags && tags.length > 0) {
    queueService.produce(config.job.tagPool);
  }
};
