import { Schema, model } from "mongoose";
import { ContactObj } from "../types/types.js";

// const SocialMedia = new Schema({
//   name: { type: String, default: '' },
//   link: { type: String, default: '' }
// });

const ContactModel = new Schema(
  {
    firstName: { type: String, required: [true, 'First name is required'], trim: true }, 
    lastName: { type: String, required: [true, 'Last name is required'], trim: true }, 
    email: { type: String, unique: true, trim: true },
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    imageUrl: { type: String, required: [true, 'Image is required'] },
    occupation: String,
    address: String,
    country: String,
    description: String, 
    gender: { type: String, default: 'Undecided', enum: ['Male', 'Female', 'Undecided'] },
    viewsCount: { type: Number, default: 0 },
  },
  {
    timestamps: true
  }
)

export const Contacts = model<ContactObj>('contacts', ContactModel)