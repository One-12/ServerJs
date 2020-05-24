const _ = require('lodash/string');
const shortid = require('shortid');
const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');

const STORAGE_ACCOUNT_NAME = 'one12storage';
const ACCOUNT_ACCESS_KEY = '43Unob3jBoZmMwwOb6qzuGbf05TcGw/P0DNlSOK8QA9se+UyE6Wm6YJzWhFTHEq9CjIwacFLZcCiOBplLQFTUQ==';

/**
 * UploadService for uploading contents to Azure Storage service.
 *
 * @class UploadService
 */
class UploadService {
  /**
   * Creates an instance of UploadService.
   *
   * @memberof UploadService
   */
  constructor() {
    const sharedKeyCredential = new StorageSharedKeyCredential(STORAGE_ACCOUNT_NAME, ACCOUNT_ACCESS_KEY);
    this._blobServiceClient = new BlobServiceClient(
      `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
      sharedKeyCredential,
    );
  }

  /**
   * Uploads content so Azure Blob Storage.
   *
   * @param {*} req
   * @param {*} res
   * @memberof UploadService
   */
  async upload(req, res) {
    const userId = req.userId;
    const fileName = shortid.generate() + '_' + _.kebabCase(req.files.photo.name);

    const createContainerResponse = await this._blobServiceClient.createContainer(userId);
    if (createContainerResponse) {
      const uploadBlobResponse = await createContainerResponse.upload(req.body, req.body.length);
      console.log(uploadBlobResponse);
    }
  }
}

module.exports = UploadService;
