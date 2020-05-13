let createError = require("http-errors");
let express = require("express");
let cors = require("cors");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let connection = require("./connection");
let swaggerOptions = require("./swagger.option");

let tagRouter = require("./resources/tag/tag.route");
let postRouter = require("./resources/post/post.route");
let likeRouter = require("./resources/like/like.route");
let commentRouter = require("./resources/comment/comment.route");
let userRouter = require('./resources/user/user.route');

const admin = require("firebase-admin");

const serviceAccount = require("./firebase_config.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://one-12-dev-1588433721353.firebaseio.com",
});

let app = express();

const expressSwagger = require("express-swagger-generator")(app);

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/tags", tagRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/likes", likeRouter);
app.use("/api/users", userRouter);

expressSwagger(swaggerOptions);
module.exports = app;
