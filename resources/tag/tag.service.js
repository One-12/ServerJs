var tagEntity = require("./tag.entity");

exports.getTrendingTags = async function() {
  const tags = await tagEntity.find({}).limit(10);
  return tags;
};

exports.createTag = async function(tagModel){
  const createdTag = await tagEntity.create(tagModel);;
  return createdTag;
}
