import * as V from "../validators/user_validator";
import * as DB from "../db/user_repository";
import { UnauthorizedError } from "../exceptions/errors";
import { getToken } from "../config/jwt-configuration";

export const { create } = DB;

export const { update } = DB;

export const { getOne } = DB;

export const { findMany } = DB;

export const login = async (input: V.LoginInput) => {
  const { password, ...user } = await DB.login(input);

  if (input.password !== password)
    throw new UnauthorizedError("Wrong password");

  return getToken({ id: user.id });
};

export const { deleteOne } = DB;
