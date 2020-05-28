const templateSchema = require('./template.entity');

const mapper = require('object-mapper');
const templateProfile = require('./template.profile');

const templateService = {
  getTemplates: async function (req) {
    const { tag, page, start, limit } = req.query;
    if (tag) {
      return await getTemplatesForTag(tag, start, limit);
    }

    page = page || 'popular';
    return await getTemplatesForPage(page, start, limit);
  },

  getTemplateById: async function (templateId) {
    const result = await templateSchema.findById(templateId);
    return mapper(result, templateProfile.templateByIdMap);
  },

  getTemplateByIds: async function (templateIds) {
    const templates = await templateSchema.find({ _id: { $in: templateIds } });
    return mapper(templates, templateProfile.templates);
  },

  createTemplate: async function (templateRequest) {
    const createdTemplate = await templateSchema.create(templateRequest);
    return createdTemplate;
  },
};

getTemplatesForPage = async function (page, start, limit) {
  const templates = await templateSchema.find({}).skip(parseInt(start)).limit(parseInt(limit));
  return mapper(templates, templateProfile.templates);
};

getTemplatesForTag = async function (tag, start, limit) {
  const templates = await templateSchema.find({ tags: tag }).skip(parseInt(start)).limit(parseInt(limit));

  return mapper(templates, templateProfile.templates);
};

module.exports = templateService;
