import Logo from "../models/logo.js";

export const logoRepository = {
  findAll: () => Logo.find(),
  findByIdAndUpdate: (
    id: string,
    update: Record<string, unknown>,
    options?: { new?: boolean }
  ) => Logo.findByIdAndUpdate(id, update, { new: true, ...options }),
  findByIdAndDelete: (id: string) => Logo.findByIdAndDelete(id),
  create: (data: Record<string, unknown>) => new Logo(data).save(),
};
