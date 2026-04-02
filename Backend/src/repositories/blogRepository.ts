import { BlogPost, Category, Comment } from "../models/Blog.js";

export const blogRepository = {
  createPost: (data: Record<string, unknown>) => new BlogPost(data).save(),
  findAllPosts: () => BlogPost.find().populate("author categories"),
  findPostById: (id: string) =>
    BlogPost.findById(id).populate("author categories comments.author"),
  findByIdAndUpdatePost: (
    id: string,
    update: Record<string, unknown>,
    options?: { new?: boolean }
  ) => BlogPost.findByIdAndUpdate(id, update, { new: true, ...options }),
  deletePost: (id: string) => BlogPost.findByIdAndDelete(id),
  findCategoryByName: (name: string) => Category.findOne({ name }),
  createCategory: (data: { name: string }) => new Category(data).save(),
  createComment: (data: Record<string, unknown>) => new Comment(data),
};
