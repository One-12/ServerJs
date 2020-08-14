const httpStatusCodes = require('http-status-codes');

const uploadService = require('./upload.service');

const uploadController = {
  upload: async (req, res) => {
    try {
      const uploadPost = await uploadService.upload(req);
      return res.status(httpStatusCodes.CREATED).json(uploadPost);
    } catch (e) {
      return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};

module.exports = uploadController;
