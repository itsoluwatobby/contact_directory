import { Schema, model } from "mongoose";
import { UserObj } from "../types/types.js";


const UserSchema = new Schema(
  {
    username: { type: String, required: [true, 'First name is required'], trim: true }, 
    email: { type: String, required: [true, 'Last name is required'], unique: true, trim: true }
  },
  {
    timestamps: true
  }
)

export const Users = model<UserObj>('users', UserSchema);