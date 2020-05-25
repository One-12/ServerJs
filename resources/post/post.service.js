var postSchema = require("./post.entity");
var queueService = require("../queue/queue.service");
var mongoose = require("mongoose");
var config = require("../../config.json");
var mapper = require("object-mapper");
var postProfile = require("./post.profile");

const postService = {
  getPosts: async function (req) {
    const { tag, page, start, limit } = req.query;
    
    var posts = [];
    if (tag) {
      return await getPostsForTag(tag, start, limit);
    }
    if (page) {
      return await getPostsForPage(page, start, limit);
    }

    const { following } = req.user;
    return await getPostsFromFollowing(following, start, limit);
  },

  getPostById: async function (postId) {
    const result = await postSchema.aggregate([
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments",
        },
      },
      { $match: { _id: mongoose.Types.ObjectId(postId) } },
    ]);

    return mapper(result, postProfile.postByIdMap);
  },

  getPostByIds: async function (postIds) {
    const posts = await postSchema.find({ _id: { $in: postIds } });
    return mapper(posts, postProfile.posts);
  },

  createPost: async function (postRequest) {
    const createdPost = await postSchema.create(postRequest);
    pushTags(postRequest);
    return createdPost;
  },

  likePost: async (likeRequest) => {
    await postSchema.findOneAndUpdate(
      { _id: likeRequest.id },
      { $inc: { likesCount: 1 } }
    );
  },
};

var pushTags = function (postRequest) {
  const tags = postRequest.tags;
  if (tags && tags.length > 0) {
    queueService.produce(config.job.tagPool, tags);
  }
};

var getPostsForPage = async function (page, start, limit) {
  const posts = await postSchema
    .find({})
    .skip(parseInt(start))
    .limit(parseInt(limit));

  return mapper(posts, postProfile.posts);
};

var getPostsFromFollowing = async function (following, start, limit) {
  const posts = await postSchema
    .find({ _id: { $in: following } })
    .skip(parseInt(start))
    .limit(parseInt(limit));

  return mapper(posts, postProfile.posts);
};
var getPostsForTag = async function (tag, start, limit) {
  const posts = await postSchema
    .find({ tags: tag })
    .skip(parseInt(start))
    .limit(parseInt(limit));

  return mapper(posts, postProfile.posts);
};

module.exports = postService;
