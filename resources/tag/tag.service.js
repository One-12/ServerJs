var tagEntity = require("./tag.entity");

const tagService = {
  getTrendingTags: async function() {
    const tags = await tagEntity.find({}).limit(10);
    return tags;
  },

  createTag: async function(tagModel) {
    const createdTag = await tagEntity.create(tagModel);
    return createdTag;
  }
};

module.exports = tagService;