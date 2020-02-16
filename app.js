var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connection = require('./connection');

var tagRouter = require('./resources/tag/tag.route');
var postRouter = require('./resources/post/post.route');
var commentRouter = require('./resources/comment/comment.route');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/tags', tagRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);

module.exports = app;
