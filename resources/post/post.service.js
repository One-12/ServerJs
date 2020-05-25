const postSchema = require('./post.entity');
const queueService = require('../queue/queue.service');
const mongoose = require('mongoose');
const config = require('../../config.json');
const mapper = require('object-mapper');
const postProfile = require('./post.profile');

const postService = {
  getPosts: async function (req) {
    const { tag, page, start, limit } = req.query;
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
          from: 'comments',
          localField: '_id',
          foreignField: 'postId',
          as: 'comments',
        },
      },
      // eslint-disable-next-line new-cap
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
    pushImageResize(createdPost);
    return createdPost;
  },

  likePost: async (likeRequest) => {
    await postSchema.findOneAndUpdate({ _id: likeRequest.id }, { $inc: { likesCount: 1 } });
  },
};

pushTags = function (postRequest) {
  const tags = postRequest.tags;
  if (tags && tags.length > 0) {
    queueService.produce(config.job.tagPool, tags);
  }
};

pushImageResize = function (postRequest) {
  const postContent = postRequest.content;
  if (postContent && postContent.length > 0) {
    queueService.produce(config.job.uploadPool, { postId: postRequest._id });
  }
};

getPostsForPage = async function (page, start, limit) {
  const posts = await postSchema.find({}).skip(parseInt(start)).limit(parseInt(limit));

  return mapper(posts, postProfile.posts);
};

getPostsFromFollowing = async function (following, start, limit) {
  const posts = await postSchema
    .find({ _id: { $in: following } })
    .skip(parseInt(start))
    .limit(parseInt(limit));

  return mapper(posts, postProfile.posts);
};
getPostsForTag = async function (tag, start, limit) {
  const posts = await postSchema.find({ tags: tag }).skip(parseInt(start)).limit(parseInt(limit));

  return mapper(posts, postProfile.posts);
};

module.exports = postService;
