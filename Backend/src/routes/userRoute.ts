import express from "express";
import {
  signupController,
  loginUserHandler,
  getUserByIdHandler,
  deleteUserByIdHandler,
  updateUserByIdHandler,
  getUser,
} from "../controllers/userController.js";
import { upload } from "../middleware/multerMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginUserHandler);
router.get("/getById/:userId", authMiddleware, getUserByIdHandler);
router.delete("/delete/:userId", deleteUserByIdHandler);
router.put(
  "/update/:userId",
  upload.fields([{ name: "image", maxCount: 10 }]),
  updateUserByIdHandler
);
router.get("/getUser", getUser);

export default router;
