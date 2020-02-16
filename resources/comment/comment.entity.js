var mongoose = require("mongoose");

var commentSchema = {
  content: { type: String, required: true },
  likesCount: { type: Number, default: 0 },
  parentId: { type: mongoose.Schema.Types.ObjectId },
  postId: { type: mongoose.Schema.Types.ObjectId }
};


module.exports = mongoose.model('comments', commentSchema);