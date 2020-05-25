const mongoose = require('mongoose');
const db = require('./config.json').mongo.uri;

mongoose
  .connect(db, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));