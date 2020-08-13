const faker = require('faker');
const postService = require('./post.service');
const httpStatusCodes = require('http-status-codes');

const postController = {
  getPosts: async function (req, res) {
    try {
      const posts = await postService.getPosts(req);
      return res.status(httpStatusCodes.OK).json(posts);
    } catch (err) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        error: err.message,
      });
    }
  },

  getFollowingUserPosts: async (req, res) => {
    try {
      const posts = await postService.getFollowingUserPosts(req);
      return res.status(httpStatusCodes.OK).json(posts);
    } catch (err) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        error: err.message,
      });
    }
  },

  getPostById: async (req, res) => {
    try {
      const post = await postService.getPostById(req.params.postId);
      return res.status(httpStatusCodes.OK).json({ post });
    } catch (err) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        error: err.message,
      });
    }
  },

  getPostsByIds: async (req, res) => {
    try {
      const postIds = req.body;
      const posts = await postService.getPostsByIds(postIds);
      return res.status(httpStatusCodes.OK).json({ posts });
    } catch (err) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        error: err.message,
      });
    }
  },

  createPost: async (req, res) => {
    try {
      const createPostRequest = req.body;
      if (!createPostRequest) {
        return res.status(httpStatusCodes.BAD_REQUEST).json({
          error: paramMissingError,
        });
      }
      createPostRequest.userId = req.user.uid;
      const createdPost = await postService.createPost(createPostRequest);
      return res.status(httpStatusCodes.CREATED).json(createdPost);
    } catch (err) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        error: err.message,
      });
    }
  },
};

generateTags = function () {
  const tags = [];
  for (let index = 0; index < 5; index++) {
    tags.push(faker.random.word());
  }
  return tags;
};

module.exports = postController;
