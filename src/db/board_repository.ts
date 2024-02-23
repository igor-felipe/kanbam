import { prisma } from "./prisma";
import * as V from "../validators/board_validator";

const select: Record<keyof V.Board, boolean> = {
  id: true,
  name: true,
  workspaceId: true,
  description: true,
  createdAt: true,
  updatedAt: true,
  columnOrder: true,
  labels: {
    select: { id: true, name: true, color: true },
  } as unknown as boolean,
};

export const create: V.CreateDb = async ({
  workspaceId,
  columnOrder,
  ...data
}) =>
  prisma.board.create({
    data: {
      ...data,
      workspace: { connect: { id: workspaceId } },
      labels: { createMany: { data: data.labels ?? [], skipDuplicates: true } },
      columnOrder: columnOrder ? { set: columnOrder } : undefined,
    },
    select,
  });

export const update: V.UpdateDb = async ({
  id,
  workspaceId,
  labels,
  columnOrder,
  ...data
}) => {
  return prisma.board.update({
    where: { id },
    data: {
      ...data,
      workspace: workspaceId ? { connect: { id: workspaceId } } : undefined,
      labels: labels
        ? {
            deleteMany: { boardId: id },
            createMany: { data: labels ?? [], skipDuplicates: true },
          }
        : undefined,
      columnOrder: columnOrder ? { set: columnOrder } : undefined,
    },
    select,
  });
};

export const findMany: V.FindManyDb = async ({
  label,
  columnOrder,
  ...where
}) =>
  prisma.board.findMany({
    where: {
      ...where,
      labels: { some: label },
    },
    select,
  });

export const getOne: V.GetOneDb = async (where) =>
  prisma.board.findUniqueOrThrow({ where, select });

export const deleteOne: V.DeleteOneDb = async (where) =>
  prisma.board.delete({ where, select });
