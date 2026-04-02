import Contact from "../models/Contact.js";

export const contactRepository = {
  create: (data: Record<string, unknown>) => Contact.create(data),
  findAll: () => Contact.find(),
};
