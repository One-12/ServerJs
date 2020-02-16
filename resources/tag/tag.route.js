var express = require('express');
var tagController = require('./tag.controller');

var router = express.Router();

router.get('/', tagController.getTrendingTags);
router.post('/', tagController.createTag);
router.get('/isAlive', (req, res) => res.status(201).end());

module.exports = router;