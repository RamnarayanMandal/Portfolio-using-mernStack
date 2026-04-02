import type { Request, Response } from "express";
import {
  createLanguage,
  updateLanguage,
  deleteLanguage,
  getLanguageById,
} from "../services/languageService.js";
import { HttpError } from "../types/errors.js";
import { routeParam } from "../utils/routeParams.js";

export const createLanguageHandler = async (req: Request, res: Response) => {
  try {
    const language = await createLanguage(req.body);
    res.status(201).json(language);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "" });
  }
};

export const updateLanguageHandler = async (req: Request, res: Response) => {
  try {
    const updated = await updateLanguage(
      routeParam(req.params.id),
      req.body
    );
    res.json(updated);
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 400;
    res.status(status).json({ message: error instanceof Error ? error.message : "" });
  }
};

export const deleteLanguageHandler = async (req: Request, res: Response) => {
  try {
    await deleteLanguage(routeParam(req.params.id));
    res.json({ message: "Language deleted successfully" });
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 400;
    res.status(status).json({ message: error instanceof Error ? error.message : "" });
  }
};

export const getLanguageByIdHandler = async (req: Request, res: Response) => {
  try {
    const language = await getLanguageById(routeParam(req.params.id));
    if (!language) {
      return res.status(404).json({ message: "Language not found" });
    }
    res.json(language);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "" });
  }
};
