import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
});

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
});

const BlogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  comments: [CommentSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  image: { type: String, default: "default-image.jpg" },
  video: { type: String, default: null },
  audio: { type: String, default: null },
  documents: [
    {
      title: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  seoTitle: { type: String, trim: true },
  seoDescription: { type: String, trim: true },
  seoKeywords: { type: String, trim: true },
});

export const Comment = mongoose.model("Comment", CommentSchema);
export const Category = mongoose.model("Category", CategorySchema);
export const BlogPost = mongoose.model("BlogPost", BlogPostSchema);
