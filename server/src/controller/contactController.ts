import { Request, Response } from "express";
import { ContactService } from "../service/contactService.js";
import { ContactObj, ContactRequest } from "../types/types.js";
import { ResponseObj } from "../service/response.js";
import { sanitizeEntries, wrapperFunc } from "../utils/helpers.js";


export class ContactController {
  private contactService = new ContactService()
  private response = new ResponseObj()

  constructor() {}

  public createContact(req: ContactRequest, res: Response) {
    wrapperFunc(res, () => {
      const contactDetails = req.body
      const ipAddress = req.ip
      const { firstName, lastName, imageUrl, gender } = contactDetails
      if (!firstName || !lastName || !imageUrl || !gender) {
        return this.response.badRequestResponse(res, 'FirstName, LastName and Image required')
      } 
      const sanitizeContact = sanitizeEntries({...contactDetails, ipAddress}) as ContactObj
      this.contactService.createContact(sanitizeContact, (err: any, data: ContactObj) => {
        if (err) return this.response.resourceConflictResponse(res, err.message)
        return this.response.successResponse(res, 'Contact created', { ...data })
      })
    })
  }
  public viewContact(req: Request, res: Response) {
    wrapperFunc(res, () => {
      const { contactId } = req.params
      if (!contactId) {
        return this.response.badRequestResponse(res, 'Contact ID required')
      } 
      this.contactService.view({ _id: contactId }, (err: any, data: ContactObj) => {
        if (err) return this.response.mongoErrorResponse(res, err.message)
        if (!data) return this.response.notFoundResponse(res, 'contact not found')
        return this.response.successResponse(res, 'Contact viewed', { ...data })
      })
    })
  }
  public getAllContacts(req: ContactRequest, res: Response) {
    wrapperFunc(res, () => {
      this.contactService.getContacts({}, (err: any, data: ContactObj[]) => {
        if (err) return this.response.mongoErrorResponse(res, err.message)
        if (!data.length) return this.response.successResponse(res, 'Empty contact list', {})
        return this.response.successResponse(res, 'Success', { count: data.length, data: { ...data } })
      })
    })
  }
  public getSingleContact(req: ContactRequest, res: Response) {
    wrapperFunc(res, () => {
      const { contactId } = req.params
      if (!contactId) {
        return this.response.badRequestResponse(res, 'Contact ID required')
      } 
      this.contactService.getContact({ _id: contactId }, (err: any, data: ContactObj) => {
        if (err) return this.response.mongoErrorResponse(res, err.message)
        if (!data) return this.response.notFoundResponse(res, 'contact not found')
        return this.response.successResponse(res, 'Contact fetched', { ...data })
      })
    })
  }
  public updateContact(req: ContactRequest, res: Response) {
    wrapperFunc(res, () => {
      const contactUpdate = req.body
      if (contactUpdate.ipAddress !== req.ip) {
        return this.response.unauthorizedResponse(res, "You don't have the WRITE access to this document")
      }
      const sanitizeContact = sanitizeEntries(contactUpdate) as ContactObj
      this.contactService.updateContact({ _id: contactUpdate._id as string }, sanitizeContact, (err: any, UpdatedData: ContactObj) => {
        if (err) return this.response.mongoErrorResponse(res, err.message)
        return this.response.successUpdateResponse(res, 'Contact updated', { ...UpdatedData })
      })
    })
  }
  public deleteContact(req: ContactRequest, res: Response) {
    wrapperFunc(res, () => {
      const { contactId } = req.params
      if (!contactId) {
        return this.response.badRequestResponse(res, 'Contact ID required')
      } 
      this.contactService.deleteContact({ _id: contactId }, (err: any,  data: any) => {
        if (err) return this.response.mongoErrorResponse(res, err.message)
        return this.response.successDeleteResponse(res, 'Contact deleted', {_id: data._id})
      })
    })
  }
}

// export default new ContactController()