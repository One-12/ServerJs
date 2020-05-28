const mongoose = require("mongoose");

const commentSchema = {
  content: { type: String, required: true },
  likesCount: { type: Number, default: 0 },
  postId: { type: mongoose.Schema.Types.ObjectId },
  replies:[{
    content:{ type :String, required: true },
    likesCount: { type: Number, default: 0 },
  }]
};


module.exports = mongoose.model('comments', commentSchema);