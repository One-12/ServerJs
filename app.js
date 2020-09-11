const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const insightKey = require('./config.json').insights.key;
const swaggerOptions = require('./swagger.option');
const fileUpload = require('express-fileupload');
const compression = require('compression');


const { AzureApplicationInsightsLogger } = require('winston-azure-application-insights');

winston.add(new AzureApplicationInsightsLogger({
    key: insightKey
}));

require('./connection');

const tagRouter = require('./resources/tag/tag.route');
const postRouter = require('./resources/post/post.route');
const likeRouter = require('./resources/like/like.route');
const commentRouter = require('./resources/comment/comment.route');
const userRouter = require('./resources/user/user.route');
const uploadRouter = require('./resources/upload/upload.route');
const templateRouter = require('./resources/template/template.route');

const admin = require('firebase-admin');

const serviceAccount = require('./firebase_config.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://one-12-dev-1588433721353.firebaseio.com',
});

const app = express();

const expressSwagger = require('express-swagger-generator')(app);


app.use(cors());
app.use(compression());
app.use(logger('dev'));
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/tags', tagRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);
app.use('/api/likes', likeRouter);
app.use('/api/users', userRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/templates', templateRouter);

expressSwagger(swaggerOptions);
module.exports = app;
