import Certificate from "../models/Certificate.js";

export const certificateRepository = {
  findById: (id: string) => Certificate.findById(id),
  findAll: () => Certificate.find(),
  findByIdAndDelete: (id: string) => Certificate.findByIdAndDelete(id),
  findByIdAndUpdate: (
    id: string,
    update: Record<string, unknown>,
    options?: { new?: boolean }
  ) => Certificate.findByIdAndUpdate(id, update, { new: true, ...options }),
  create: (data: Record<string, unknown>) => new Certificate(data).save(),
};
