const postService = require('./post.service');
const httpStatusCodes = require('http-status-codes');
const createPostValidator = require('./validators/create-post.validator');

const postController = {
  getPosts: async (req, res) => {
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
      req.body.userId = req.user.uid;
      const [data, error] = await createPostValidator.validate(req);

      if (data) {
        const createdPost = await postService.createPost(data);
        return res.status(httpStatusCodes.CREATED).json(createdPost);
      } else {
        return res.status(httpStatusCodes.BAD_REQUEST).json(error);
      }
    } catch (e) {
      return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};

module.exports = postController;
