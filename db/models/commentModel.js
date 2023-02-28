const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  content: {
    type: String,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});
const Comments = mongoose.model("Comments", commentSchema);
module.exports = Comments;
