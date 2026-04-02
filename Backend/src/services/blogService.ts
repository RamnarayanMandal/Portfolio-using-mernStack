import { BlogPost, Category, Comment } from "../models/Blog.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { HttpError } from "../types/errors.js";

async function ensureCategoryIds(
  categories: unknown
): Promise<unknown[]> {
  const categoryArray = Array.isArray(categories)
    ? categories
    : [categories];
  return Promise.all(
    categoryArray.map(async (categoryName: string) => {
      let category = await Category.findOne({ name: categoryName });
      if (!category) {
        category = new Category({ name: categoryName });
        await category.save();
      }
      return category._id;
    })
  );
}

export async function createPost(
  body: Record<string, unknown>,
  files?: Record<string, Express.Multer.File[]>
) {
  const { title, content, author, categories } = body;

  let imageCloudinaryUrl: string | null = null;
  let videoCloudinaryUrl: string | null = null;
  let audioCloudinaryUrl: string | null = null;
  const documentUrls: { title: string; url: string }[] = [];

  if (files?.image?.length) {
    const result = await uploadOnCloudinary(files.image[0].path);
    if (result) imageCloudinaryUrl = result.url;
  }
  if (files?.video?.length) {
    const result = await uploadOnCloudinary(files.video[0].path, {
      folder: "blog_videos",
      resource_type: "video",
    });
    if (result) videoCloudinaryUrl = result.url;
  }
  if (files?.audio?.length) {
    const result = await uploadOnCloudinary(files.audio[0].path, {
      folder: "blog_audio",
      resource_type: "video",
    });
    if (result) audioCloudinaryUrl = result.url;
  }
  if (files?.documents?.length) {
    for (const file of files.documents) {
      const result = await uploadOnCloudinary(file.path, {
        folder: "blog_documents",
        resource_type: "raw",
      });
      if (result) {
        documentUrls.push({ title: file.originalname, url: result.url });
      }
    }
  }

  const categoryIds = await ensureCategoryIds(categories);
  const { seoTitle, seoDescription, seoKeywords } = body;

  const newPost = new BlogPost({
    title,
    content,
    author,
    categories: categoryIds,
    image: imageCloudinaryUrl,
    video: videoCloudinaryUrl,
    audio: audioCloudinaryUrl,
    documents: documentUrls,
    seoTitle,
    seoDescription,
    seoKeywords,
  });
  await newPost.save();
  return newPost;
}

export const getAllPosts = () =>
  BlogPost.find().populate("author categories");

export const getPostById = (id: string) =>
  BlogPost.findById(id).populate("author categories comments.author");

export async function updatePost(
  id: string,
  body: Record<string, unknown>,
  files?: Record<string, Express.Multer.File[]>
) {
  const { title, content, categories } = body;
  const updateFields: Record<string, unknown> = {};

  if (title) updateFields.title = title;
  if (content) updateFields.content = content;

  const uploadFiles = async (
    file: Express.Multer.File,
    folder: string,
    resourceType: "image" | "video" | "raw"
  ) => {
    const result = await uploadOnCloudinary(file.path, {
      folder,
      resource_type: resourceType,
    });
    return result?.url;
  };

  if (files) {
    if (files.image?.length) {
      updateFields.image = await uploadFiles(
        files.image[0],
        "blog_images",
        "image"
      );
    }
    if (files.video?.length) {
      updateFields.video = await uploadFiles(
        files.video[0],
        "blog_videos",
        "video"
      );
    }
    if (files.audio?.length) {
      updateFields.audio = await uploadFiles(
        files.audio[0],
        "blog_audio",
        "video"
      );
    }
    if (files.documents?.length) {
      const docs: { title: string; url: string }[] = [];
      for (const file of files.documents) {
        const url = await uploadFiles(file, "blog_documents", "raw");
        if (url) docs.push({ title: file.originalname, url });
      }
      updateFields.documents = docs;
    }
  }

  if (categories) {
    const categoryArray = Array.isArray(categories)
      ? categories
      : [categories];
    updateFields.categories = await ensureCategoryIds(categoryArray);
  }

  if (body.seoTitle !== undefined) updateFields.seoTitle = body.seoTitle;
  if (body.seoDescription !== undefined)
    updateFields.seoDescription = body.seoDescription;
  if (body.seoKeywords !== undefined) updateFields.seoKeywords = body.seoKeywords;

  const post = await BlogPost.findByIdAndUpdate(id, updateFields, { new: true });
  if (!post) {
    throw new HttpError("Post not found", 404);
  }
  return post;
}

export async function deletePost(id: string) {
  const post = await BlogPost.findByIdAndDelete(id);
  if (!post) {
    throw new HttpError("Post not found", 404);
  }
}

export async function addComment(
  postId: string,
  body: { name: string; email: string; content: string }
) {
  const comment = new Comment(body);
  const post = await BlogPost.findByIdAndUpdate(
    postId,
    { $push: { comments: comment } },
    { new: true }
  );
  if (!post) {
    throw new HttpError("Post not found", 404);
  }
  return comment;
}

export async function updateComment(commentId: string, content: string) {
  const post = await BlogPost.findOneAndUpdate(
    { "comments._id": commentId },
    { $set: { "comments.$.content": content } },
    { new: true }
  );
  if (!post) {
    throw new HttpError("Comment not found", 404);
  }
  return post;
}

export async function deleteComment(postId: string, commentId: string) {
  const post = await BlogPost.findByIdAndUpdate(
    postId,
    { $pull: { comments: { _id: commentId } } },
    { new: true }
  );
  if (!post) {
    throw new HttpError("Comment not found", 404);
  }
}

export async function likePost(id: string) {
  const post = await BlogPost.findByIdAndUpdate(
    id,
    { $inc: { likes: 1 } },
    { new: true }
  );
  if (!post) {
    throw new HttpError("Post not found", 404);
  }
  return post;
}

export async function dislikePost(id: string) {
  const post = await BlogPost.findByIdAndUpdate(
    id,
    { $inc: { dislikes: 1 } },
    { new: true }
  );
  if (!post) {
    throw new HttpError("Post not found", 404);
  }
  return post;
}

export async function likeComment(commentId: string) {
  const post = await BlogPost.findOneAndUpdate(
    { "comments._id": commentId },
    { $inc: { "comments.$.likes": 1 } },
    { new: true }
  );
  if (!post) {
    throw new HttpError("Comment not found", 404);
  }
  return post;
}

export async function dislikeComment(commentId: string) {
  const post = await BlogPost.findOneAndUpdate(
    { "comments._id": commentId },
    { $inc: { "comments.$.dislikes": 1 } },
    { new: true }
  );
  if (!post) {
    throw new HttpError("Comment not found", 404);
  }
  return post;
}
