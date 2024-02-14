import { prisma } from "./prisma";
import * as V from "../validators/column_validator";

export const create: V.CreateDb = async ({
  boardId,
  ...data
}: V.CreateDbInput) =>
  prisma.column.create({
    data: {
      ...data,
      board: { connect: { id: boardId } },
    },
  });

export const update: V.UpdateDb = async ({ id, boardId, ...data }) =>
  prisma.column.update({
    where: { id },
    data: {
      ...data,
      board: { connect: { id: boardId } },
    },
  });

export const findMany: V.FindManyDb = async (where) =>
  prisma.column.findMany({ where });

export const getOne: V.GetOneDb = async (where) =>
  prisma.column.findUniqueOrThrow({ where });

export const deleteOne: V.DeleteOneDb = async (where) =>
  prisma.column.delete({ where });
