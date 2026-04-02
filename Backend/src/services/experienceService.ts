import { experienceRepository } from "../repositories/experienceRepository.js";
import { HttpError } from "../types/errors.js";

export async function createExperience(body: Record<string, unknown>) {
  const { jobTitle, company, session, achievements, seoTitle, seoDescription, seoKeywords } =
    body;
  return experienceRepository.create({
    jobTitle,
    company,
    session,
    achievements,
    seoTitle,
    seoDescription,
    seoKeywords,
  });
}

export async function updateExperience(id: string, body: Record<string, unknown>) {
  const experience = await experienceRepository.findByIdAndUpdate(id, body);
  if (!experience) {
    throw new HttpError("Experience not found", 404);
  }
  return experience;
}

export const getExperienceById = (id: string) =>
  experienceRepository.findById(id);

export const deleteExperience = (id: string) =>
  experienceRepository.findByIdAndDelete(id);

export const getAllExperiences = () => experienceRepository.findAll();
