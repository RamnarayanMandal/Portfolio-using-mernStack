import type { Request, Response } from "express";
import {
  createProjectWithFiles,
  updateProjectWithFiles,
  listProjects,
  getProjectById as findProjectById,
  deleteProjectById,
} from "../services/projectService.js";
import { projectRepository } from "../repositories/projectRepository.js";
import { HttpError } from "../types/errors.js";
import { routeParam } from "../utils/routeParams.js";

type MulterFiles = Record<string, Express.Multer.File[]>;

export const createProject = async (req: Request, res: Response) => {
  try {
    const project = await createProjectWithFiles({
      body: req.body,
      files: req.files as MulterFiles | undefined,
    });
    res.status(201).json(project);
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 400;
    res.status(status).json({
      error: error instanceof Error ? error.message : "Error",
    });
  }
};

export const getAllProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await listProjects();
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "" });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await findProjectById(routeParam(req.params.id));
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "" });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const existing = await projectRepository.findById(routeParam(req.params.id));
    if (!existing) {
      return res.status(404).json({ message: "Project not found" });
    }
    const project = await updateProjectWithFiles({
      id: routeParam(req.params.id),
      body: req.body,
      files: req.files as MulterFiles | undefined,
      existing,
    });
    res.json(project);
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 400;
    res.status(status).json({
      error: error instanceof Error ? error.message : "Error",
    });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await deleteProjectById(routeParam(req.params.id));
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "" });
  }
};
