import express from "express";
import {
  createExperienceHandler,
  getExperienceByIdHandler,
  updateExperienceHandler,
  deleteExperienceHandler,
  getExperiencesHandler,
} from "../controllers/experienceController.js";

const router = express.Router();

router.post("/create", createExperienceHandler);
router.get("/getById/:id", getExperienceByIdHandler);
router.put("/update/:id", updateExperienceHandler);
router.delete("/delete/:id", deleteExperienceHandler);
router.get("/", getExperiencesHandler);

export default router;
