import * as V from "../validators/user_validator";
import * as DB from "../db/user_repository";
import { UnauthorizedError } from "../exceptions/errors";
import { getToken } from "../config/jwt-configuration";

export const create = async (input: V.CreateUcInput) => DB.create(input);

export const update = async (input: V.UpdateUcInput) => DB.update(input);

export const getOne = async (input: V.GetOneUcInput) => DB.getOne(input);

export const findMany = async (input: V.FindManyUcInput) => DB.findMany(input);

export const login = async (input: V.LoginUcInput) => {
  const { password, ...user } = await DB.login(input);

  if (input.password !== password)
    throw new UnauthorizedError("Wrong password");

  return getToken(user);
};
