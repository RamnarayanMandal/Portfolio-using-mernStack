import Skill from "../models/skill.js";

export const skillRepository = {
  findByName: (name: string) => Skill.findOne({ name }),
  findById: (id: string) => Skill.findById(id),
  findAll: () => Skill.find(),
  findByIdAndDelete: (id: string) => Skill.findByIdAndDelete(id),
};
