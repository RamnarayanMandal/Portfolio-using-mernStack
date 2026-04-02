import express from "express";
import {
  createLanguageHandler,
  updateLanguageHandler,
  deleteLanguageHandler,
  getLanguageByIdHandler,
} from "../controllers/languageController.js";

const router = express.Router();

router.post("/create", createLanguageHandler);
router.put("/update/:id", updateLanguageHandler);
router.delete("/delete/:id", deleteLanguageHandler);
router.get("/getById/:id", getLanguageByIdHandler);

export default router;
