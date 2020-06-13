const postService = require('./post.service');
const faker = require('faker');
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

  getFollowingUserPosts: async (req,res) =>{
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

  createNewPost: async (req, res) => {
    try {
      const posts = req.body;
      if (!posts) {
        return res.status(httpStatusCodes.BAD_REQUEST).json({
          error: paramMissingError,
        });
      }
      posts.userId = req.user.uid;
      const createdPost = await postService.createPost(posts);
      return res.status(httpStatusCodes.CREATED).json(createdPost);
    } catch (err) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        error: err.message,
      });
    }
  },

  createFakePosts: async (req, res) => {
    try {
      const size = req.query.size;
      if (size > 50) {
        throw new Error('Maximum 50 fake can be created');
      }
      console.log('Creating 500 fake post in server');
      for (let i = 0; i < size; i++) {
        {
          const post = {
            content: faker.internet.avatar(),
            title: faker.lorem.words(5),
            commentsCount: Math.random(),
            likesCount: Math.random(),
            points: Math.random(),
            postedBy: {
              firstName: faker.internet.userName(),
              id: faker.lorem.word(),
              lastName: faker.internet.userName(),
              middleName: faker.internet.userName(),
              userName: faker.internet.userName(),
            },
            postedOn: faker.date.past(),
            tags: generateTags(),
            type: faker.internet.domainName(),
            views: Math.random(),
            userId: faker.internet.userName(),
          };
          await postService.createPost(post);
        }
      }
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
