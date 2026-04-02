import type { Request, Response } from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  addComment,
  updateComment,
  deleteComment,
  likePost,
  dislikePost,
  likeComment,
  dislikeComment,
} from "../services/blogService.js";
import { HttpError } from "../types/errors.js";
import { routeParam } from "../utils/routeParams.js";

type MulterFiles = Record<string, Express.Multer.File[]>;

export const createPostHandler = async (req: Request, res: Response) => {
  try {
    const newPost = await createPost(req.body, req.files as MulterFiles);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({
      message: "Error creating post",
      error: error instanceof Error ? error.message : "",
    });
  }
};

export const getAllPostsHandler = async (_req: Request, res: Response) => {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

export const getPostByIdHandler = async (req: Request, res: Response) => {
  try {
    const post = await getPostById(routeParam(req.params.id));
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post", error });
  }
};

export const updatePostHandler = async (req: Request, res: Response) => {
  try {
    const post = await updatePost(
      routeParam(req.params.id),
      req.body,
      req.files as MulterFiles
    );
    res.status(200).json(post);
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    res.status(status).json({
      message: "Error updating post",
      error: error instanceof Error ? error.message : "",
    });
  }
};

export const deletePostHandler = async (req: Request, res: Response) => {
  try {
    await deletePost(routeParam(req.params.id));
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    res.status(status).json({
      message: "Error deleting post",
      error: error instanceof Error ? error.message : "",
    });
  }
};

export const addCommentHandler = async (req: Request, res: Response) => {
  try {
    const comment = await addComment(routeParam(req.params.id), req.body);
    res.status(201).json(comment);
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    res.status(status).json({
      message: "Error adding comment",
      error: error instanceof Error ? error.message : "",
    });
  }
};

export const updateCommentHandler = async (req: Request, res: Response) => {
  try {
    const post = await updateComment(
      routeParam(req.params.commentId),
      req.body.content
    );
    res.status(200).json(post);
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    res.status(status).json({
      message: "Error updating comment",
      error: error instanceof Error ? error.message : "",
    });
  }
};

export const deleteCommentHandler = async (req: Request, res: Response) => {
  try {
    await deleteComment(
      routeParam(req.params.id),
      routeParam(req.params.commentId)
    );
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    res.status(status).json({
      message: "Error deleting comment",
      error: error instanceof Error ? error.message : "",
    });
  }
};

export const likePostHandler = async (req: Request, res: Response) => {
  try {
    const post = await likePost(routeParam(req.params.id));
    res.status(200).json(post);
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    res.status(status).json({
      message: "Error liking post",
      error: error instanceof Error ? error.message : "",
    });
  }
};

export const dislikePostHandler = async (req: Request, res: Response) => {
  try {
    const post = await dislikePost(routeParam(req.params.id));
    res.status(200).json(post);
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    res.status(status).json({
      message: "Error disliking post",
      error: error instanceof Error ? error.message : "",
    });
  }
};

export const likeCommentHandler = async (req: Request, res: Response) => {
  try {
    const post = await likeComment(routeParam(req.params.commentId));
    res.status(200).json(post);
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    res.status(status).json({
      message: "Error liking comment",
      error: error instanceof Error ? error.message : "",
    });
  }
};

export const dislikeCommentHandler = async (req: Request, res: Response) => {
  try {
    const post = await dislikeComment(routeParam(req.params.commentId));
    res.status(200).json(post);
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    res.status(status).json({
      message: "Error disliking comment",
      error: error instanceof Error ? error.message : "",
    });
  }
};

export const uploadVideoHandler = async (_req: Request, res: Response) => {
  res.status(200).json({ message: "Video uploaded successfully" });
};

export const uploadPDFHandler = async (_req: Request, res: Response) => {
  res.status(200).json({ message: "PDF uploaded successfully" });
};

export const uploadAudioHandler = async (_req: Request, res: Response) => {
  res.status(200).json({ message: "Audio uploaded successfully" });
};
