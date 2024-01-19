import { Schema, model } from "mongoose";
import { ContactObj } from "../types/types.js";

const SocialMedia = new Schema({
  name: { type: String, default: '' },
  link: { type: String, default: '' }
});

const ContactModel = new Schema(
  {
    firstName: { type: String, trim: true }, 
    lastName: { type: String, trim: true }, 
    email: { type: String, unique: true, trim: true },
    ipAddress: { type: String },
    imageUrl: { type: String },
    occupation: String,
    address: String,
    country: String,
    description: String, 
    gender: { type: String, default: 'Undecided', enum: ['Male', 'Female', 'Undecided'] },
    viewsCount: { type: Number, default: 0 },
    socialMediaAccounts: [SocialMedia],
    owner: { type: String, trim: true }
  },
  {
    timestamps: true
  }
)

export const Contacts = model<ContactObj>('contacts', ContactModel)