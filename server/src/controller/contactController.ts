import { Request } from "express";
import { ContactService } from "../service/contactService.js";
import { ContactRequest } from "../types/types.js";

class ContactController {
  private contactService = new ContactService()

  constructor() {}

  public createContact(req: ContactRequest, res: Response) {
    const contactDetails = req.body
    if (![...Object.values(contactDetails)].every(Boolean))
  }
}