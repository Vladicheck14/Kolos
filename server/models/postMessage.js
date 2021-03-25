import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  creatorName: String,
  selectedFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likesCount: {
    type: Number,
    default: 0,
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
