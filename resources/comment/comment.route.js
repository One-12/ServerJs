var express = require('express');
var commentController = require('./comment.controller');

var router = express.Router();

router.get('/', commentController.getCommentsForPost);
router.post('/', commentController.createComment);

router.get('/isAlive', (req, res) => res.status(201).end());

module.exports = router;
