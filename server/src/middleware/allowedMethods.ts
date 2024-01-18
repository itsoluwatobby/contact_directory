import { NextFunction, Request, Response } from "express";
import { METHODS } from "../types/types.js";

export const allowedMethods = (req: Request, res: Response, next: NextFunction, methods: METHODS[]) => {

  return;
}