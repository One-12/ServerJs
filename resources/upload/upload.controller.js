const httpStatusCodes = require('http-status-codes');

const uploadService = require('./upload.service');

const uploadController = {
  uploadImage: async (req, res) => {
    try {
      const uploadPost = await uploadService.uploadImage(req);
      return res.status(httpStatusCodes.CREATED).json(uploadPost);
    } catch (e) {
      return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  uploadVideo: async (req, res) => {
    try {
      const uploadedVideo = await uploadService.uploadVideo(req);
      return res.status(httpStatusCodes.CREATED).json(uploadedVideo);
    } catch (e) {
      return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
};

module.exports = uploadController;
