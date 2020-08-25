const express = require('express');
const uploadController = require('./upload.controller');
const authorize = require('../../middlewares/auth/auth.middleware');

const router = new express.Router();

router.post('/image', authorize, uploadController.uploadImage);

router.post('/video', uploadController.uploadVideo);

module.exports = router;
