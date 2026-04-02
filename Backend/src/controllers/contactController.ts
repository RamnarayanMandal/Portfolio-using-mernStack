import type { Request, Response } from "express";
import { createContact, getAllContacts } from "../services/contactService.js";

export const createContactHandler = async (req: Request, res: Response) => {
  try {
    const newContact = await createContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating contact",
      error: error instanceof Error ? error.message : "",
    });
  }
};

export const getAllContactsHandler = async (_req: Request, res: Response) => {
  try {
    const contacts = await getAllContacts();
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching contacts",
      error: error instanceof Error ? error.message : "",
    });
  }
};
