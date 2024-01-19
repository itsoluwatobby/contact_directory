import { Request, Response } from "express";
import { ContactService } from "../service/contactService.js";
import { ContactObj, ContactRequest } from "../types/types.js";
import { ResponseObj } from "../service/response.js";
import { sanitizeEntries, wrapperFunc } from "../utils/helpers.js";
import { logger } from "../config/logger.js";


export class ContactController {
  private contactService = new ContactService()
  private response = new ResponseObj()
  // private logger = logger

  constructor() {}

  public getStarted(req: ContactRequest, res: Response) {
    wrapperFunc(res, () => {
      const { email } = req.body
      if (!email) {
        const msg = 'email required'
        logger.error(msg);
        return this.response.badRequestResponse(res, msg)
      } 
      const sanitizeContact = sanitizeEntries({ owner: email }) as ContactObj
      this.contactService.createContact(sanitizeContact, (err: any, data: any) => {
        if (err) {
          logger.error(err.message);
          return this.response.resourceConflictResponse(res, err.message)
        }
        logger.info('Registered');
        return this.response.successResponse(res, 'Contact created', { data: data._doc })
      })
    })
  }

  public createContact(req: ContactRequest, res: Response) {
    wrapperFunc(res, () => {
      const contactDetails = req.body
      const ipAddress = req.ip
      const { firstName, lastName, imageUrl, gender } = contactDetails
      if (!firstName || !lastName || !imageUrl || !gender) {
        const msg = 'FirstName, LastName and Image required'
        logger.error(msg);
        return this.response.badRequestResponse(res, msg)
      } 
      const sanitizeContact = sanitizeEntries({...contactDetails, ipAddress}) as ContactObj
      this.contactService.createContact(sanitizeContact, (err: any, data: any) => {
        if (err) {
          logger.error(err.message);
          return this.response.resourceConflictResponse(res, err.message)
        }
        logger.info('Contact created');
        return this.response.successResponse(res, 'Contact created', { data: data._doc })
      })
    })
  }
  public viewContact(req: Request, res: Response) {
    wrapperFunc(res, () => {
      const { contactId } = req.params
      if (!contactId) {
        logger.error('Contact ID required');
        return this.response.badRequestResponse(res, 'Contact ID required')
      } 
      this.contactService.view({ _id: contactId }, (err: any, data: ContactObj) => {
        if (err) {
          logger.error(err.message);
          return this.response.mongoErrorResponse(res, err.message)
        }
        if (!data) {
          logger.error('contact not found')
          return this.response.notFoundResponse(res, 'contact not found')
        }
        logger.info('Contact viewed');
        return this.response.successResponse(res, 'Contact viewed', { data })
      })
    })
  }
  public getAllContacts(req: ContactRequest, res: Response) {
    wrapperFunc(res, () => {
      const { ipAddress } = req.params;
      this.contactService.getContacts({ ipAddress }, (err: any, data: ContactObj[]) => {
        if (err) {
          logger.error(err.message);
          return this.response.mongoErrorResponse(res, err.message);
        }
        if (!data.length) {
          const msg = 'Empty contact list';
          logger.error(msg);
          return this.response.successResponse(res, msg, {});
        }
        logger.info('Success');
        return this.response.successResponse(res, 'Success', { data });
      })
    })
  }
  public getSingleContact(req: ContactRequest, res: Response) {
    wrapperFunc(res, () => {
      const { email } = req.params
      if (!email) {
        logger.error('Contact ID required');
        return this.response.badRequestResponse(res, 'Contact ID required');
      } 
      this.contactService.getContact({ email }, (err: any, data: ContactObj) => {
        if (err) {
          logger.error(err.message);
          return this.response.mongoErrorResponse(res, err.message);
        }
        if (!data) {
          logger.error('Contact not found')
          return this.response.successResponse(res, 'contact not found', { status: 'NOT_AVAILABLE' });
        }
        logger.info('Contact fetched')
        return this.response.successResponse(res, 'Contact fetched', { status: 'CONFLICT' })
      })
    })
  }
  public updateContact(req: ContactRequest, res: Response) {
    wrapperFunc(res, () => {
      const contactUpdate = req.body
      if (contactUpdate.ipAddress !== req.ip) {
        const msg = "You don't have the WRITE access to this document"
        logger.error(msg);
        return this.response.unauthorizedResponse(res, msg);
      }
      const sanitizeContact = sanitizeEntries(contactUpdate) as ContactObj
      this.contactService.updateContact({ _id: contactUpdate._id as string }, sanitizeContact, (err: any, UpdatedData: ContactObj) => {
        if (err) {
          logger.error(err.message);
          return this.response.mongoErrorResponse(res, err.message);
        }
        logger.info('Contact updated');
        return this.response.successUpdateResponse(res, 'Contact updated', { data: UpdatedData });
      })
    })
  }
  public deleteContact(req: ContactRequest, res: Response) {
    wrapperFunc(res, () => {
      const { contactId } = req.params
      if (!contactId) {
        logger.error('Contact ID required');
        return this.response.badRequestResponse(res, 'Contact ID required');
      } 
      this.contactService.deleteContact({ _id: contactId }, (err: any,  data: ContactObj) => {
        if (err) {
          logger.error(err.message);
          return this.response.mongoErrorResponse(res, err.message);
        }
        if (!data) {
          logger.error('Contact not found')
          return this.response.notFoundResponse(res, 'contact not found');
        }
        logger.info('Contact deleted');
        return this.response.successDeleteResponse(res, 'Contact deleted', {_id: data._id});
      })
    })
  }
}

// export default new ContactController()