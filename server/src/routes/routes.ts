import express, { Request, Response } from 'express'
import { ContactController } from '../controller/contactController.js';
import { ContactRequest, UserRequest } from '../types/types.js';
import { UserController } from '../controller/usersController.js';

export class AppRouter {
  router = express.Router()
  private contactController = new ContactController()
  private userController = new UserController()

  constructor() {
    // contact
    this.router.get('/', (req: ContactRequest, res: Response) => this.contactController.getAllContacts(req, res));
    this.router.get('/:email', (req: ContactRequest, res: Response) => this.contactController.getSingleContact(req, res));
    this.router.post('/create/:userId', (req: ContactRequest, res: Response) => this.contactController.createContact(req, res));
    this.router.patch('/view_contact/:contactId', (req: Request, res: Response) => this.contactController.viewContact(req, res));
    this.router.put('/update_contact/:userId', (req: ContactRequest, res: Response) => this.contactController.updateContact(req, res));
    this.router.delete('/delete/:contactId/:userId', (req: ContactRequest, res: Response) => this.contactController.deleteContact(req, res));

    // users
    this.router.post('/user/get_started', (req: UserRequest, res: Response) => this.userController.getStarted(req, res));
  }
}