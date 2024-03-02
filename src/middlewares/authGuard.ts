import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'
import { AuthPayload } from "../models/auth/AuthPayload";

export function authGuard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).end()
  }
  const [, jwt] = token.split(" ")

  try {
    const { sub } = verify(
      jwt,
      process.env.JWT_SECRET
    ) as AuthPayload

    req.user_id = sub

    return next();

  } catch (err) {
    return res.status(401).end()
  }
}