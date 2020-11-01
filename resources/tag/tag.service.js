const tagEntity = require('./tag.entity');

const tagService = {
  getTrendingTags: async function () {
    const tags = await tagEntity.find({}).sort({ hitCount: -1 }).limit(10);
    return tags;
  },

  createTag: async function (tagModel) {
    const createdTag = await tagEntity.create(tagModel);
    return createdTag;
  },
};

module.exports = tagService;
