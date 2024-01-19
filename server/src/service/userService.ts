import { Users } from "../model/Users.js";
import { UserObj } from "../types/types.js";

export class UsersService {

  constructor() {}

  public getUser(filter: object={}, cb: any) {
    Users.findOne(filter).lean()
    .then(user => cb(null, user))
    .catch((err) => cb(err, null));
  }
  public createUser(newUser: UserObj, cb: any) {
    Users.create(newUser)
    .then(user => cb(null, user))
    .catch(err => cb(err, null));
  }
}