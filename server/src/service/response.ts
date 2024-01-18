import { Response } from "express";
import { HTTP_CODES } from "../utils/constants.js";

 
export class ResponseObj {
  private HTTP_STATUS_CODES = HTTP_CODES

  constructor() {}

  public successResponse(res: Response, message: string, DATA?: object) {
    const status_code = this.HTTP_STATUS_CODES.created;
    return res.status(status_code).json({ status: status_code, message, DATA });
  }
  public successUpdateResponse(res: Response, message: string, DATA?: object) {
    const status_code = this.HTTP_STATUS_CODES.updated;
    return res.status(status_code).json({ status: status_code, message, DATA });
  }
  public successDeleteResponse(res: Response, message: string, DATA?: object) {
    const status_code = this.HTTP_STATUS_CODES.accepted;
    return res.status(status_code).json({ status: status_code, message, DATA });
  }
  public badRequestResponse(res: Response, message: string, DATA?: object) {
    const status_code = this.HTTP_STATUS_CODES.bad_request;
    return res.status(status_code).json({ status: status_code, message, DATA });
  }
  public unauthorizedResponse(res: Response, message: string) {
    const status_code = this.HTTP_STATUS_CODES.unauthorized;
    return res.status(status_code).json({ status: status_code, message });
  }
  public forbiddenResponse(res: Response, message: string) {
    const status_code = this.HTTP_STATUS_CODES.forbidden;
    return res.status(status_code).json({ status: status_code, message });
  }
  public resourceConflictResponse(res: Response, message: string, DATA: object={}) {
    const status_code = this.HTTP_STATUS_CODES.conflict;
    return res.status(status_code).json({ status: status_code, message, DATA });
  }
  public mongoErrorResponse(res: Response, message: string) {
    const status_code = this.HTTP_STATUS_CODES.internal_server_error;
    return res.status(status_code).json({ status: status_code, message });
  }
  public serverErrorResponse(res: Response, message: string) {
    const status_code = this.HTTP_STATUS_CODES.internal_server_error;
    return res.status(status_code).json({ status: status_code, message });
  }
}