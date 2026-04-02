import express from "express";
import { upload } from "../middleware/multerMiddleware.js";
import {
  createPostHandler,
  getAllPostsHandler,
  getPostByIdHandler,
  updatePostHandler,
  deletePostHandler,
  addCommentHandler,
  updateCommentHandler,
  deleteCommentHandler,
  likePostHandler,
  dislikePostHandler,
  likeCommentHandler,
  dislikeCommentHandler,
  uploadVideoHandler,
  uploadPDFHandler,
  uploadAudioHandler,
} from "../controllers/blogController.js";

export const uploadFields = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "video", maxCount: 1 },
  { name: "audio", maxCount: 1 },
  { name: "documents", maxCount: 10 },
]);

const router = express.Router();

router.post("/posts", uploadFields, createPostHandler);
router.get("/posts", getAllPostsHandler);
router.get("/posts/:id", getPostByIdHandler);
router.put("/posts/:id", uploadFields, updatePostHandler);
router.delete("/posts/:id", deletePostHandler);
router.post("/posts/:id/comments", addCommentHandler);
router.put("/posts/:id/comments/:commentId", updateCommentHandler);
router.delete("/posts/:id/comments/:commentId", deleteCommentHandler);
router.post("/posts/:id/like", likePostHandler);
router.post("/posts/:id/dislike", dislikePostHandler);
router.post("/comments/:commentId/like", likeCommentHandler);
router.post("/comments/:commentId/dislike", dislikeCommentHandler);
router.post("/upload/video", uploadFields, uploadVideoHandler);
router.post("/upload/pdf", uploadFields, uploadPDFHandler);
router.post("/upload/audio", uploadFields, uploadAudioHandler);

export default router;
