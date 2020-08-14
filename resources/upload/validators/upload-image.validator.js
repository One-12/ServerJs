const Joi = require('@hapi/joi');

const validate = async (req) => {
  const uploadImageSchema = Joi.object().keys({
    user: Joi.object().required(),
    files: Joi.object().required(),
  });

  try {
    const result = await uploadImageSchema.validateAsync(req);
    return Promise.resolve([result, null]);
  } catch (error) {
    return Promise.resolve([null, error]);
  }
};

module.exports = { validate };
