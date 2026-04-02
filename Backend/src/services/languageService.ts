import { languageRepository } from "../repositories/languageRepository.js";
import { HttpError } from "../types/errors.js";

export async function createLanguage(body: Record<string, unknown>) {
  return languageRepository.create(body);
}

export async function updateLanguage(id: string, body: Record<string, unknown>) {
  const updated = await languageRepository.findByIdAndUpdate(id, body);
  if (!updated) {
    throw new HttpError("Language not found", 404);
  }
  return updated;
}

export async function deleteLanguage(id: string) {
  const deleted = await languageRepository.findByIdAndDelete(id);
  if (!deleted) {
    throw new HttpError("Language not found", 404);
  }
}

export const getLanguageById = (id: string) => languageRepository.findById(id);
