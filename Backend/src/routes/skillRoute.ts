import express from "express";
import {
  createSkill,
  getSkillByIdHandler,
  updateSkill,
  deleteSkill,
  getAllSkillsHandler,
} from "../controllers/skillController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multerMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  upload.fields([{ name: "logo", maxCount: 1 }]),
  createSkill
);
router.get("/getById/:id", getSkillByIdHandler);
router.get("/getAllSkills", getAllSkillsHandler);
router.put(
  "/update/:id",
  upload.fields([{ name: "logo", maxCount: 1 }]),
  updateSkill
);
router.delete("/delete/:id", authMiddleware, deleteSkill);

export default router;
