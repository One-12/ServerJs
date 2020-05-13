var mongoose = require('mongoose');

var tagSchema = {
  name: { type: String, required: true, lowercase: true, unique: true }
};

module.exports	= mongoose.model('tags', tagSchema);
