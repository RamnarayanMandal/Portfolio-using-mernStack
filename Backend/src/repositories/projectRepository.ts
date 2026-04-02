import Project from "../models/Project.js";

export const projectRepository = {
  findAll: () => Project.find(),
  findById: (id: string) => Project.findById(id),
  findByIdAndDelete: (id: string) => Project.findByIdAndDelete(id),
  create: (doc: Record<string, unknown>) => new Project(doc).save(),
  findByIdAndUpdate: (
    id: string,
    update: Record<string, unknown>,
    options?: { new?: boolean; runValidators?: boolean }
  ) =>
    Project.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
      ...options,
    }),
};
