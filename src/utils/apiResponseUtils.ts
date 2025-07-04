import type { Request, Response } from "express";
import { type THTTPRESPONSE } from "../type/types.js";
import logger from "./loggerUtils.js";
const jsonResponse = (
  status: number,
  message: string = "OK",
  data: object | null | object[] = null,
  metaData: object | null | object[] = null,
  optMessage: string = ""
) => {
  return {
    success: status < 400,
    statusCode: status,
    message: message,
    data: data,
    metaData: metaData,
    optMessage: optMessage
  };
};
const httpResponse = (req: Request, res: Response, statusCode: number, message: string, data: unknown = null): Response => {
  const response: THTTPRESPONSE = {
    success: statusCode < 400,
    status: statusCode,
    message,
    data,
    requestInfo: {
      url: req.originalUrl,
      ip: req?.ip,
      method: req.method
    }
  };
  logger.info("this is called", response);
  // if (ENV && ENV === "production" && response.requestInfo) {
  delete response.requestInfo;
  // }
  return res.status(statusCode).json(response).end();
};
export { httpResponse, jsonResponse };
