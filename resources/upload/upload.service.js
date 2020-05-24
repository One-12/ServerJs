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
   * @memberof UploadService
   */
  async uploadPost(req) {
    try {
      await this._validateUploadPostRequest(req);
    } catch (err) {
      return Promise.reject(err);
    }

    const userId = req.user.uid;
    const file = req.files.file;
    const fileName = shortid.generate() + '_' + _.kebabCase(file.name);
    let containerClient = this._blobServiceClient.getContainerClient(userId);

    if (!(await containerClient.exists())) {
      containerClient = (await this._blobServiceClient.createContainer(userId, { access: 'blob' })).containerClient;
    }

    const uploadBlobResponse = await containerClient.uploadBlockBlob(fileName, file.data, file.size);
    return Promise.resolve({ data: uploadBlobResponse.blockBlobClient.url });
  }

  /**
   Validates Upload Post Request Input
   *
   * @param {*} req
   * @return {Promise<void>}
   * @memberof UploadService
   */
  _validateUploadPostRequest(req) {
    if (!req.user || !req.user.uid) {
      return Promise.reject(new Error('UPLOAD_USERID_MANDATORY'));
    }

    if (!req.files || !req.files.file) {
      return Promise.reject(new Error('UPLOAD_FILE_MANDATORY'));
    }

    if (req.files.file.size / 1024 / 1024 > 5) {
      return Promise.reject(new Error('UPLOAD_FILE_SIZEGREATERTHAN5MB'));
    }

    return Promise.resolve();
  }
}

module.exports = UploadService;
