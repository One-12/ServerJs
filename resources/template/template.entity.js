const mongoose = require('mongoose');

const templateSchema = {
  title: { type: String, required: true },
  content: { type: String, required: true },
  views: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  tags: { type: [String] },
  templatedOn: { type: Date, default: Date.now },
  userId: { type: String, required: true },
};

module.exports = mongoose.model('templates', templateSchema);
