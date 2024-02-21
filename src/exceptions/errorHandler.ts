import { Prisma } from "@prisma/client";
import express, {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from "express";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { DefaultError } from "./errors";

export default function errorHandler(
  err: unknown,
  _req: ExRequest,
  res: ExResponse,
  next: NextFunction,
): ExResponse | void | express.NextFunction {
  //
  if (err instanceof z.ZodError) {
    return res.status(422).json({
      message: fromZodError(err, { prefix: null }).message.replace(
        /[\\'"]/g,
        "",
      ),
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const code =
      err.code === "P2025"
        ? 404
        : err.code === "P2002" || err.code === "P2014"
          ? 409
          : 500;
    return res.status(code).json({
      message: `${err}`,
    });
  }

  if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    return res.status(500).json({
      message: err.message,
    });
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(422).json({
      message: err.message,
    });
  }

  if (err instanceof DefaultError) {
    return res.status(err.code).json({
      message: err.details,
    });
  }

  if (err instanceof Error) {
    const code = err.name === "UnauthorizedError" ? 401 : 500;
    return res.status(code).json({
      message: err.message,
    });
  }

  return next();
}
