import { Contacts } from "../model/Contact.js";
import { ContactObj } from "../types/types.js";

export class ContactService {

  constructor() {}

  public getContacts(filter: Record<string, string>={}, cb: (err: any, data: ContactObj[]) => any) {
    Contacts.find(filter, cb)
  }
  public getContact(filter: Record<string, string>, cb: (err: any, data: ContactObj) => any) {
    Contacts.findOne(filter, cb)
  }
  public createContact(newContact: ContactObj, cb: (err: any, data: ContactObj) => any) {
    Contacts.create({...newContact})
  }
  public updateContact(filter: Record<string, string>, updatedContact: Partial<ContactObj>, cb: (err: any, data: ContactObj) => any) {
    Contacts.findByIdAndUpdate(filter, {...updatedContact}, cb)
  }
  public deleteContact(filter: Record<string, string>, cb: (err: any, data: any) => any) {
    Contacts.findByIdAndDelete(filter, cb)
  }
}