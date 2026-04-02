import type { Request, Response } from "express";
import {
  createExperience,
  updateExperience,
  getExperienceById,
  deleteExperience,
  getAllExperiences,
} from "../services/experienceService.js";
import { HttpError } from "../types/errors.js";
import { routeParam } from "../utils/routeParams.js";

export const createExperienceHandler = async (req: Request, res: Response) => {
  try {
    const saved = await createExperience(req.body);
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getExperienceByIdHandler = async (req: Request, res: Response) => {
  try {
    const experience = await getExperienceById(routeParam(req.params.id));
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.json(experience);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "" });
  }
};

export const updateExperienceHandler = async (req: Request, res: Response) => {
  try {
    const experience = await updateExperience(
      routeParam(req.params.id),
      req.body
    );
    res.json(experience);
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 400;
    res.status(status).json({ message: error instanceof Error ? error.message : "" });
  }
};

export const deleteExperienceHandler = async (req: Request, res: Response) => {
  try {
    const experience = await deleteExperience(routeParam(req.params.id));
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "" });
  }
};

export const getExperiencesHandler = async (_req: Request, res: Response) => {
  try {
    const experiences = await getAllExperiences();
    if (experiences.length === 0) {
      return res.status(404).json({ message: "No experiences found" });
    }
    res.json(experiences);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "" });
  }
};
