var express = require('express');
var likeController = require('./like.controller');

var router = express.Router();

router.patch('/', likeController.likeEntity);

module.exports = router;