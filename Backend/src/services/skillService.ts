import Skill from "../models/skill.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { skillRepository } from "../repositories/skillRepository.js";
import { HttpError } from "../types/errors.js";

export async function createSkillWithFiles(
  body: Record<string, unknown>,
  files?: Record<string, Express.Multer.File[]>
) {
  const {
    name,
    yearsExperience,
    description,
    rating,
    projectUrl,
    seoTitle,
    seoDescription,
    seoKeywords,
  } = body;

  let parsedProjectUrl: { name?: string; url?: string }[] = [];
  if (projectUrl && typeof projectUrl === "string") {
    parsedProjectUrl = JSON.parse(projectUrl);
  }

  const skillExists = await skillRepository.findByName(name as string);
  if (skillExists) {
    throw new HttpError("Skill already exists.", 400);
  }

  let logoLocalPath: string | null = null;
  if (files?.logo?.length) {
    logoLocalPath = files.logo[0].path;
  }

  const Newlogo = await uploadOnCloudinary(logoLocalPath as string);
  if (!Newlogo?.url) {
    throw new HttpError("Logo upload failed", 400);
  }

  const skill = new Skill({
    name,
    yearsExperience,
    description,
    rating,
    logo: Newlogo.url,
    projectUrl: parsedProjectUrl,
    seoTitle,
    seoDescription,
    seoKeywords,
  });
  await skill.save();
  return skill;
}

export async function updateSkillWithFiles(
  id: string,
  body: Record<string, unknown>,
  files?: Record<string, Express.Multer.File[]>
) {
  const {
    name,
    yearsExperience,
    description,
    rating,
    projectUrl,
    seoTitle,
    seoDescription,
    seoKeywords,
  } = body;

  let parsedProjectUrl: { name?: string; url?: string }[] = [];
  if (projectUrl && typeof projectUrl === "string") {
    parsedProjectUrl = JSON.parse(projectUrl);
  }

  const skill = await skillRepository.findById(id);
  if (!skill) {
    throw new HttpError("Skill not found", 404);
  }

  let newLogoUrl = skill.logo as string;
  if (files?.logo?.length) {
    const uploaded = await uploadOnCloudinary(files.logo[0].path);
    if (uploaded?.url) newLogoUrl = uploaded.url;
  }

  skill.name = (name as string) || skill.name;
  skill.yearsExperience =
    (yearsExperience as number) || skill.yearsExperience;
  skill.description = (description as string) || skill.description;
  skill.rating = (rating as number) || skill.rating;
  skill.logo = newLogoUrl;
  skill.set(
    "projectUrl",
    parsedProjectUrl.length > 0 ? parsedProjectUrl : skill.projectUrl
  );
  if (seoTitle !== undefined) skill.seoTitle = seoTitle as string;
  if (seoDescription !== undefined)
    skill.seoDescription = seoDescription as string;
  if (seoKeywords !== undefined) skill.seoKeywords = seoKeywords as string;

  await skill.save();
  return skill;
}

export const getAllSkills = () => skillRepository.findAll();
export const getSkillById = (id: string) => skillRepository.findById(id);
export const deleteSkillById = (id: string) =>
  skillRepository.findByIdAndDelete(id);
