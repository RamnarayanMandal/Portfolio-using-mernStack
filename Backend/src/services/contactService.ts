import { contactRepository } from "../repositories/contactRepository.js";

export async function createContact(body: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return contactRepository.create(body);
}

export const getAllContacts = () => contactRepository.findAll();
