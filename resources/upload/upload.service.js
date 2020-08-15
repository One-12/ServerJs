const _ = require('lodash/string');
const shortid = require('shortid');
const { BlobServiceClient } = require('@azure/storage-blob');

const uploadService = {
  upload: async (req) => {
    const file = req.files.file;
    const userId = req.user.uid.toLowerCase();
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      'DefaultEndpointsProtocol=https;AccountName=one12storage;AccountKey=43Unob3jBoZmMwwOb6qzuGbf05TcGw/P0DNlSOK8QA9se+UyE6Wm6YJzWhFTHEq9CjIwacFLZcCiOBplLQFTUQ==;EndpointSuffix=core.windows.net',
    );

    const fileExtension = file.name.split('.').pop().toLowerCase();
    const originalFileName = file.name.toLowerCase().replace(fileExtension, '');
    const fileName = `${shortid.generate()}_${_.kebabCase(originalFileName)}.${fileExtension}`;

    let containerClient = blobServiceClient.getContainerClient(userId);

    if (!(await containerClient.exists())) {
      containerClient = (await blobServiceClient.createContainer(userId, { access: 'blob' })).containerClient;
    }

    const uploadBlobResponse = await containerClient.uploadBlockBlob(fileName, file.data, file.size);
    return Promise.resolve({ data: uploadBlobResponse.blockBlobClient.url });
  },
};

module.exports = uploadService;
