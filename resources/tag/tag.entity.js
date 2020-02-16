var mongoose = require('mongoose'),
    schema   = mongoose.Schema;

var tagSchema = {
  name: { type: String, required: true, lowercase: true, unique: true }
};

var tagPostSchema = {
  tagId: { type: String, required: true },
  postIds: { type: [String] }
};


module.exports	= mongoose.model('tags', tagSchema);
