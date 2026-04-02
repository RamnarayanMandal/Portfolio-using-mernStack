import User from "../models/User.js";

export const userRepository = {
  findByEmail: (email: string) => User.findOne({ email }),
  findById: (id: string) => User.findById(id),
  findOne: () => User.findOne({}),
  create: (data: Record<string, unknown>) => new User(data).save(),
  findByIdAndUpdate: (
    id: string,
    update: Record<string, unknown>,
    options?: { new?: boolean; runValidators?: boolean }
  ) =>
    User.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
      ...options,
    }),
  findByIdAndDelete: (id: string) => User.findByIdAndDelete(id),
};
