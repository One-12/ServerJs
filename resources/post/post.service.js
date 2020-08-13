const mongoose = require('mongoose');
const mapper = require('object-mapper');
const config = require('../../config.json');
const postSchema = require('./post.entity');
const postProfile = require('./post.profile');
const queueService = require('../queue/queue.service');

const postService = {
  getPosts: async function (req) {
    const { tag, page, start, limit } = req.query;
    if (tag) {
      return await getPostsForTag(tag, start, limit);
    }
    return await getPostsForPage(page, start, limit);
  },

  getFollowingUserPosts: async (req) => {
    const { start, limit } = req.query;
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
      { $match: { _id: new mongoose.Types.ObjectId(postId) } },
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
  const posts = await getPostsWithUserInfo({ $match: {} }, start, limit);
  return mapper(posts, postProfile.posts);
};

getPostsFromFollowing = async function (following, start, limit) {
  const posts = await getPostsWithUserInfo({ $match: { userId: { $in: following } } }, start, limit);
  return mapper(posts, postProfile.posts);
};

getPostsForTag = async function (tag, start, limit) {
  const posts = await getPostsWithUserInfo({ $match: { tags: tag } }, start, limit);
  return mapper(posts, postProfile.posts);
};

getPostsWithUserInfo = async function (matchPipeLine, start, limit) {
  const posts = await postSchema
    .aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: 'uid',
          as: 'postedBy',
        },
      },
      matchPipeLine,
      { $unwind: '$postedBy' },
    ])
    .skip(parseInt(start))
    .limit(parseInt(limit));

  return posts;
};

module.exports = postService;
