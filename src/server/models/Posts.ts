import mongoose, { Schema, models } from "mongoose";

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  workout: {
    type: Object,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userName: {
    type: String,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = models.post || mongoose.model("User", postSchema);

export default Post;
