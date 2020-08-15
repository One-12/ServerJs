const mongoose = require('mongoose');

const tagSchema = {
  name: { type: String, required: true, lowercase: true, unique: true }
};

module.exports	= mongoose.model('tags', tagSchema);
