const uploadService = require('./upload.service');
const httpStatusCodes = require('http-status-codes');

const uploadController = {
  upload: async function (req, res) {
    try {
      const upload = await uploadService.upload(req, res);
      return res.status(httpStatusCodes.CREATED).json(upload);
    } catch {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        error: err.message,
      });
    }
  },
};

module.exports = uploadController;
