import express from "express";
import {
  createEducationHandler,
  getEducationByIdHandler,
  updateEducationHandler,
  deleteEducationHandler,
  getAllEducationHandler,
} from "../controllers/educationController.js";
import { upload } from "../middleware/multerMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  upload.fields([{ name: "image", maxCount: 1 }]),
  createEducationHandler
);
router.get("/getById/:id", getEducationByIdHandler);
router.get("/getAllEdu", getAllEducationHandler);
router.put(
  "/update/:id",
  upload.fields([{ name: "image", maxCount: 1 }]),
  updateEducationHandler
);
router.delete("/delete/:id", deleteEducationHandler);

export default router;
