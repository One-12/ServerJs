const tagService = require('./tag.service');
const httpStatusCodes = require('http-status-codes');

const tagController = {
  getTrendingTags: async function (req, res) {
    try {
      const tags = await tagService.getTrendingTags();
      return res.status(httpStatusCodes.OK).json({ tags });
    } catch (err) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        error: err.message,
      });
    }
  },

  createTag: async function (req, res) {
    try {
      const tag = req.body;
      if (!tag) {
        return res.status(httpStatusCodes.BAD_REQUEST).json({
          error: 'One or more of the required parameters was missing.',
        });
      }
      const createdTag = await tagService.createTag(tag);
      return res.status(httpStatusCodes.CREATED).json(createdTag);
    } catch (err) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        error: err.message,
      });
    }
  },
};

module.exports = tagController;
