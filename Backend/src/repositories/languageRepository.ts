import Language from "../models/Language.js";

export const languageRepository = {
  findById: (id: string) => Language.findById(id),
  findByIdAndDelete: (id: string) => Language.findByIdAndDelete(id),
  findByIdAndUpdate: (id: string, update: Record<string, unknown>) =>
    Language.findByIdAndUpdate(id, update, { new: true }),
  create: (data: Record<string, unknown>) => new Language(data).save(),
};
