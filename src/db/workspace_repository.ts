import { prisma } from "./prisma";
import * as V from "../validators/workspace_validator";

const select: Record<keyof V.Workspace, boolean> = {
  id: true,
  name: true,
  userId: true,
};

export const create: V.CreateDb = async ({ userId, ...data }) =>
  prisma.workspace.create({
    data: {
      ...data,
      User: { connect: { id: userId } },
      Member: {
        create: { role: "admin", User: { connect: { id: userId } } },
      },
    },
  });

export const update: V.UpdateDb = async ({ id, userId, ...data }) =>
  prisma.workspace.update({
    where: { id },
    data: {
      ...data,
      User: { connect: { id: userId } },
    },
  });

export const findMany: V.FindManyDb = async (where) =>
  prisma.workspace.findMany({ where, select });

export const getOne: V.GetOneDb = async (where) =>
  prisma.workspace.findUniqueOrThrow({ where, select });

export const deleteOne: V.DeleteOneDb = async (where) =>
  prisma.workspace.delete({ where });
