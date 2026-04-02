import Experience from "../models/experienceModel.js";

export const experienceRepository = {
  findById: (id: string) => Experience.findById(id),
  findAll: () => Experience.find(),
  findByIdAndDelete: (id: string) => Experience.findByIdAndDelete(id),
  findByIdAndUpdate: (
    id: string,
    update: Record<string, unknown>,
    options?: { new?: boolean; runValidators?: boolean }
  ) =>
    Experience.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
      ...options,
    }),
  create: (data: Record<string, unknown>) => new Experience(data).save(),
};
