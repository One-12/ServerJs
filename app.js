var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connection = require('./connection');
var swaggerOptions = require('./swagger.option');

var tagRouter = require('./resources/tag/tag.route');
var postRouter = require('./resources/post/post.route');
var likeRouter = require('./resources/like/like.route');
var commentRouter = require('./resources/comment/comment.route');

var app = express();

const expressSwagger = require('express-swagger-generator')(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/tags', tagRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);
app.use('/api/likes', likeRouter);

expressSwagger(swaggerOptions);
module.exports = app;
