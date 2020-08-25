const msRest = require('ms-rest');
const _ = require('lodash/string');
const shortid = require('shortid');
const msRestAzure = require('ms-rest-azure');
const azureStorage = require('azure-storage');
const MediaServices = require('azure-arm-mediaservices');
const { BlobServiceClient } = require('@azure/storage-blob');

const AZURE_MEDIA_SERVICE_CONFIG = {
  aadClientId: 'e4163f2d-e796-48de-922f-3114b87f6842',
  aadSecret: '._6y5N~qHk7-5DqXemn6qe8RCR9Xan_0Yp',
  aadTenantDomain: 'barunselvakumargmail.onmicrosoft.com',
  aadTenantId: 'dde2c834-2637-47c3-8181-a8f244257f8f',
  accountName: 'one12devmedia',
  location: 'South India',
  resourceGroup: 'one-12-dev',
  subscriptionId: 'cc54a505-fbf7-435d-99bd-411ba490f0d4',
  armAadAudience: 'https://management.core.windows.net',
  aadEndpoint: "https://login.microsoftonline.com/",
  armEndpoint: 'https://management.azure.com',
};

const uploadService = {
  uploadImage: async (req) => {
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

  uploadVideo: async (req) => {
    msRestAzure.loginWithServicePrincipalSecret(AZURE_MEDIA_SERVICE_CONFIG.aadClientId, AZURE_MEDIA_SERVICE_CONFIG.aadSecret, AZURE_MEDIA_SERVICE_CONFIG.aadTenantId, {
      environment: {
        activeDirectoryResourceId: AZURE_MEDIA_SERVICE_CONFIG.armAadAudience,
        resourceManagerEndpointUrl: AZURE_MEDIA_SERVICE_CONFIG.armEndpoint,
        activeDirectoryEndpointUrl: AZURE_MEDIA_SERVICE_CONFIG.aadEndpoint
      }
    }, async function(err, credentials, subscriptions) {
      if (err) {
        return console.log(err);
      }
      const azureMediaServicesClient = new MediaServices(credentials, AZURE_MEDIA_SERVICE_CONFIG.subscriptionId, AZURE_MEDIA_SERVICE_CONFIG.armEndpoint, { noRetryPolicy: true });
      const asset = await azureMediaServicesClient.assets.createOrUpdate(AZURE_MEDIA_SERVICE_CONFIG.resourceGroup, AZURE_MEDIA_SERVICE_CONFIG.accountName, 'arun', {});

      console.log("connected");

    });
    return Promise.resolve({ data: 'SUCCESS' });
  },
};

module.exports = uploadService;
