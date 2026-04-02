import type { Request, Response } from "express";
import {
  createSkillWithFiles,
  updateSkillWithFiles,
  getAllSkills,
  getSkillById,
  deleteSkillById,
} from "../services/skillService.js";
import { HttpError } from "../types/errors.js";
import { routeParam } from "../utils/routeParams.js";

type MulterFiles = Record<string, Express.Multer.File[]>;

export const createSkill = async (req: Request, res: Response) => {
  try {
    const skill = await createSkillWithFiles(req.body, req.files as MulterFiles);
    res.status(201).json({ message: "Skill created successfully!", skill });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "" });
  }
};

export const getSkillByIdHandler = async (req: Request, res: Response) => {
  try {
    const skill = await getSkillById(routeParam(req.params.id));
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.json(skill);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "" });
  }
};

export const getAllSkillsHandler = async (_req: Request, res: Response) => {
  try {
    const skills = await getAllSkills();
    res.json(skills);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching skills",
      error: error instanceof Error ? error.message : "",
    });
  }
};

export const updateSkill = async (req: Request, res: Response) => {
  try {
    const skill = await updateSkillWithFiles(
      routeParam(req.params.id),
      req.body,
      req.files as MulterFiles
    );
    res.json({ message: "Skill updated successfully!", skill });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "" });
  }
};

export const deleteSkill = async (req: Request, res: Response) => {
  try {
    const skill = await deleteSkillById(routeParam(req.params.id));
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.json({ message: "Skill deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "" });
  }
};
