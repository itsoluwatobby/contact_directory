import { Request, Response } from "express";
import { UsersService } from "../service/userService.js";
import { UserObj, UserRequest } from "../types/types.js";
import { ResponseObj } from "../service/response.js";
import { sanitizeEntries, wrapperFunc } from "../utils/helpers.js";
import { logger } from "../config/logger.js";
import { Users } from "../model/Users.js";


export class UserController {
  private userService = new UsersService()
  private response = new ResponseObj()

  constructor() {}

  public getStarted(req: UserRequest, res: Response) {
    wrapperFunc(res, async () => {
      const { email, username } = req.body
      if (!email || !username) {
        const msg = 'email and username required'
        logger.error(msg);
        return this.response.badRequestResponse(res, msg)
      } 
      const user = await this.getUser(email)
      if (user !== null && user.username === username) {
        logger.info('Account fetched');
        return this.response.successResponse(res, 'Account fetched', { data: user })
      }
      else {
        const sanitizeUser = sanitizeEntries({ username, email }) as UserObj
        this.userService.createUser(sanitizeUser, (err: any, data: any) => {
          if (err) {
            logger.error(err.message);
            return this.response.resourceConflictResponse(res, 'Email taken')
          }
          logger.info('Account created');
          return this.response.successResponse(res, 'User created', { data: data._doc })
        })
      }
    })
  }
  public async getUser(email: string): Promise<UserObj | null> { 
    const user = await Users.findOne({ email }).exec();
    if (!user) return null;
    return user;
  }
}
