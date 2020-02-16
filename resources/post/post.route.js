var express = require('express');
var postController = require('./post.controller');

var router = express.Router();

router.get('/', postController.getPosts);
router.get('/:postId', postController.getPostById);
router.put('/', postController.getPostsByIds);

router.post('/', postController.createNewPost);
router.post('/_fake', postController.createFakePosts);
router.get('/isAlive', (req, res) => res.status(201).end());

module.exports = router;