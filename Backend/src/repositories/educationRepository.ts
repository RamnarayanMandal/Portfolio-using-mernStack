import Education from "../models/Education.js";

export const educationRepository = {
  findById: (id: string) => Education.findById(id),
  findAll: () => Education.find(),
  findByIdAndDelete: (id: string) => Education.findByIdAndDelete(id),
  findByIdAndUpdate: (
    id: string,
    update: Record<string, unknown>,
    options?: { new?: boolean; runValidators?: boolean }
  ) =>
    Education.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
      ...options,
    }),
  create: (data: Record<string, unknown>) => new Education(data).save(),
};
