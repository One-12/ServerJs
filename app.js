let createError = require('http-errors');
let express = require('express');
let cors = require('cors');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let connection = require('./connection');
let swaggerOptions = require('./swagger.option');

let tagRouter = require('./resources/tag/tag.route');
let postRouter = require('./resources/post/post.route');
let likeRouter = require('./resources/like/like.route');
let commentRouter = require('./resources/comment/comment.route');

let authorize = require('./middlewares/auth.middleware');

let app = express();

const expressSwagger = require('express-swagger-generator')(app);

app.use(cors());
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
