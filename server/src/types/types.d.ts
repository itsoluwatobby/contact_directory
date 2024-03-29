import { Request } from "express";
import { Document, Model, Types } from "mongoose";

type METHODS = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

type ModelType<T> = Model<T, {}, {}, {}, Document<unknown, {}, T> & T & {
  _id: Types.ObjectId;
}, any>

type PageRequest<T, K> = {
  itemsLength: number, 
  Models: ModelType<T>, 
  callback: () => Promise<T[]>, 
  // callback: ({skip, limit, query}: FuncArgsType) => T[], 
  query?: string
  page: number,
  limit: number,
}

type FuncArgsType = { 
  skip: number, 
  limit: number, 
  query?: string 
}

// type SocialMedia = {
//   name: string,
//   link: string,
// }

interface ContactObj extends Document {
  _id?: string,
  userId: string,
  firstName: string; 
  lastName: string; 
  email?: string;
  occupation?: string;
  imageUrl: string,
  address?: string,
  country?: string,
  description?: string,
  gender: 'Male' | 'Female' | 'Undecided',
  viewsCount: number,
}

interface ContactRequest extends Request {
  body: Partial<ContactObj>;
}

interface UserObj extends Document {
  _id?: string;
  email: string;
  username: string;
}

interface UserRequest extends Request {
  body: Partial<UserObj>;
}