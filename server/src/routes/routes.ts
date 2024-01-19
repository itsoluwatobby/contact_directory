import express, { Request, Response } from 'express'
import { ContactController } from '../controller/contactController.js';
import { ContactRequest } from '../types/types.js';

export class AppRouter {
  router = express.Router()
  private contactController = new ContactController()

  constructor() {
    this.router.get('/', (req: ContactRequest, res: Response) => this.contactController.getAllContacts(req, res));
    this.router.get('/:email', (req: ContactRequest, res: Response) => this.contactController.getSingleContact(req, res));
    this.router.post('/create', (req: ContactRequest, res: Response) => this.contactController.createContact(req, res));
    this.router.patch('/view_contact/:contactId', (req: ContactRequest, res: Response) => this.contactController.viewContact(req, res));
    this.router.put('/update_contact', (req: ContactRequest, res: Response) => this.contactController.updateContact(req, res));
    this.router.delete('/delete/:contactId', (req: ContactRequest, res: Response) => this.contactController.deleteContact(req, res));
  }
}