import { Contacts } from "../model/Contact.js";
import { ContactObj } from "../types/types.js";

export class ContactService {

  constructor() {}

  public getContacts(filter: object={}, cb: any) {
    Contacts.find(filter).lean()
    .then(contacts => cb(null, contacts))
    .catch((err) => cb(err, null));
  }
  public getContact(filter: Record<string, string>, cb: any) {
    Contacts.findOne(filter).lean()
    .then(contact => cb(null, contact))
    .catch((err) => cb(err, null));
  }
  public view(filter: Record<string, string>, cb: any) {
    Contacts.findOneAndUpdate(filter, {$inc: { viewsCount: 1 }}, { new: true }).lean()
    .then(contact => cb(null, contact))
    .catch((err) => cb(err, null));
  }
  public createContact(newContact: ContactObj, cb: any) {
    Contacts.create(newContact)
    .then(contact => cb(null, contact))
    .catch(err => cb(err, null));
  }
  public updateContact(filter: Record<string, string>, updatedContact: Partial<ContactObj>, cb: any) {
    Contacts.findOneAndUpdate(filter, {$set: updatedContact }, { new: true }).lean()
    .then(contact => cb(null, contact))
    .catch((err) => cb(err, null));
  }
  public deleteContact(filter: Record<string, string>, cb: any) {
    Contacts.findByIdAndDelete(filter)
    .then(contact => cb(null, contact))
    .catch((err) => cb(err, null));
  }
}