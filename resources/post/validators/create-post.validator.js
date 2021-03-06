const Joi = require('@hapi/joi');
const POST_TYPES = require('../constants').POST_TYPES;

const validate = async (req) => {
  const createPostSchema = Joi.object().keys({
    title: Joi.string().required().max(999),
    content: Joi.string().required().max(999),
    description: Joi.string(),
    type: Joi.string().required().valid(POST_TYPES.IMAGE, POST_TYPES.VIDEO, POST_TYPES.YOUTUBE),
    tags: Joi.array().required(),
    userId: Joi.string().required(),
    isEmailVerified: Joi.boolean().truthy(),
  });

  try {
    const result = await createPostSchema.validateAsync(req.body);
    return Promise.resolve([result, null]);
  } catch (error) {
    return Promise.resolve([null, error]);
  }
};

module.exports = { validate };
