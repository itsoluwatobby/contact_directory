import express, { Request, Response } from 'express'

export class AppRouter {
  router = express.Router()

  constructor() {
    this.router.get('/', (req: Request, res: Response) => {});
  }
}