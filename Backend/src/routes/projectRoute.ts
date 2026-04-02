import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { upload } from "../middleware/multerMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  upload.fields([{ name: "imageUrl", maxCount: 10 }]),
  createProject
);
router.get("/getById/:id", getProjectById);
router.get("/getAll/", getAllProjects);
router.put(
  "/update/:id",
  upload.fields([{ name: "imageUrl", maxCount: 100 }]),
  updateProject
);
router.delete("/delete/:id", deleteProject);

export default router;
