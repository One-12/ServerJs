const UploadService = require('./upload.service');
const httpStatusCodes = require('http-status-codes');

/**
 * UploadController for uploading images for Posts/ Posts Templates.
 *
 * @class UploadController
 */
class UploadController {
  /**
   * Uploads images/GIFs/ videos.
   *
   * @param {*} req
   * @param {*} res
   * @memberof UploadController
   */
  async upload(req, res) {
    try {
      const uploadService = new UploadService();
      const upload = await uploadService.uploadPost(req);
      return res.status(httpStatusCodes.CREATED).json(upload);
    } catch (err) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        error: err.message,
      });
    }
  }
}

module.exports = UploadController;
