const express = require('express');
const UploadController = require('./upload.controller');
const isAuthorized = require('../../middlewares/auth.middleware');

// eslint-disable-next-line new-cap
const router = express.Router();
const uploadController = new UploadController();

router.post('/', isAuthorized, uploadController.upload);

module.exports = router;
