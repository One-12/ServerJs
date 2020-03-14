var postSchema = require("./post.entity");
var queueService = require("../queue/queue.service");
var mongoose = require("mongoose");
var config = require("../../config.json");
var mapper = require("object-mapper");
var postProfile = require("./post.profile");

const postService = {
  getPosts: async function(start, limit) {
    const posts = await postSchema
      .find({})
      .skip(parseInt(start))
      .limit(parseInt(limit));

    return mapper(posts, postProfile.posts);
  },

  getPostById: async function(postId) {
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

    return mapper(result, postProfile.postByIdMap);
  },

  getPostByIds: async function(postIds) {
    const posts = await postSchema.find({ _id: { $in: postIds } });
    return mapper(posts, postProfile.posts);
  },

  createPost: async function(postRequest) {
    const createdPost = await postSchema.create(postRequest);
    pushTags(postRequest);
    return createdPost;
  },

  likePost: async likeRequest => {
    await postSchema.findOneAndUpdate(
      { _id: likeRequest.id },
      { $inc: { likesCount: 1 } }
    );
  }
};

var pushTags = function(postRequest) {
  const tags = postRequest.tags;
  if (tags && tags.length > 0) {
    queueService.produce(config.job.tagPool, tags);
  }
};

module.exports = postService;
