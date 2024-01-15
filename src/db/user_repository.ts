import { prisma } from "./prisma";
import * as V from "../validators/user_validator";

const select: Record<keyof Omit<V.User, "password">, boolean> = {
  id: true,
  email: true,
  name: true,
};

export const create: V.CreateDb = async (data) =>
  prisma.user.create({ data, select });

export const update: V.UpdateDb = async ({ id, ...data }) =>
  prisma.user.update({ where: { id }, data, select });

export const findMany: V.FindManyDb = async (where) =>
  prisma.user.findMany({ where, select });

export const getOne: V.GetOneDb = async (where) =>
  prisma.user.findUniqueOrThrow({ where, select });

export const deleteOne: V.DeleteOneDb = async (where) =>
  prisma.user.delete({ where, select });

export const login: V.LoginDb = async (data) =>
  prisma.user.findUniqueOrThrow({ where: { email: data.email } });
