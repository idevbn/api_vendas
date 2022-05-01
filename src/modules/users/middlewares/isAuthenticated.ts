import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "@config/auth";

const isAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT Token is missing.");
  }

  const [, token] = authHeader.split(" ");

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    return next();
  } catch {
    throw new AppError("Invalid JWT Token.");
  }
};

export { isAuthenticated };
