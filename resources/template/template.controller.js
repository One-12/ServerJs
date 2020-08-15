const templateService = require('./template.service');
const faker = require('faker');
const httpStatusCodes = require('http-status-codes');

const templateController = {
  getTemplates: async function (req, res) {
    try {
      const templates = await templateService.getTemplates(req);
      return res.status(httpStatusCodes.OK).json(templates);
    } catch (err) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        error: err.message,
      });
    }
  },

  getTemplateById: async (req, res) => {
    try {
      const template = await templateService.getTemplateById(req.params.templateId);
      return res.status(httpStatusCodes.OK).json({ template });
    } catch (err) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        error: err.message,
      });
    }
  },

  getTemplatesByIds: async (req, res) => {
    try {
      const templateIds = req.body;
      const templates = await templateService.getTemplatesByIds(templateIds);
      return res.status(httpStatusCodes.OK).json({ templates });
    } catch (err) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        error: err.message,
      });
    }
  },

  createNewTemplate: async (req, res) => {
    try {
      const template = req.body;
      if (!template) {
        return res.status(httpStatusCodes.BAD_REQUEST).json({});
      }
      template.userId = req.user.uid;
      const createdTemplate = await templateService.createTemplate(template);
      return res.status(httpStatusCodes.CREATED).json(createdTemplate);
    } catch (err) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        error: err.message,
      });
    }
  },

  createFakeTemplates: async (req, res) => {
    try {
      const size = req.query.size;
      if (size > 50) {
        throw new Error('Maximum 50 fake can be created');
      }
      console.log('Creating 500 fake template in server');
      for (let i = 0; i < size; i++) {
        {
          const template = {
            content: faker.internet.avatar(),
            title: faker.lorem.words(5),
            commentsCount: Math.random(),
            likesCount: Math.random(),
            points: Math.random(),
            templatedBy: {
              firstName: faker.internet.userName(),
              id: faker.lorem.word(),
              lastName: faker.internet.userName(),
              middleName: faker.internet.userName(),
              userName: faker.internet.userName(),
            },
            templatedOn: faker.date.past(),
            tags: generateTags(),
            type: faker.internet.domainName(),
            views: Math.random(),
            userId: req.user.uid,
          };
          await templateService.createTemplate(template);
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

module.exports = templateController;
