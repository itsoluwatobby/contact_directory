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

type SocialMedia = {
  name: string,
  link: string,
}

interface ContactObj extends Document {
  _id?: string,
  firstName: string; 
  lastName: string; 
  email?: string;
  occupation?: string;
  ipAddress: string,
  imageUrl: string,
  address?: string,
  country?: string,
  description?: string,
  gender: 'Male' | 'Female' | 'Undecided',
  viewsCount: number,
  socialMediaAccounts?: SocialMedia[],
}

interface ContactRequest extends Request {
  body: Partial<ContactObj>;
}