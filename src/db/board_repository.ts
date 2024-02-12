import { prisma } from "./prisma";
import * as V from "../validators/board_validator";

const select: Record<keyof V.Board, boolean> = {
  id: true,
  name: true,
  workspaceId: true,
  description: true,
  createdAt: true,
  updatedAt: true,
};

export const create: V.CreateDb = async ({ workspaceId, ...data }) =>
  prisma.board.create({
    data: {
      ...data,
      workspace: { connect: { id: workspaceId } },
    },
  });

export const update: V.UpdateDb = async ({ id, workspaceId, ...data }) =>
  prisma.board.update({
    where: { id },
    data: {
      ...data,
      workspace: { connect: { id: workspaceId } },
    },
  });

export const findMany: V.FindManyDb = async (where) =>
  prisma.board.findMany({ where, select });

export const getOne: V.GetOneDb = async (where) =>
  prisma.board.findUniqueOrThrow({ where, select });

export const deleteOne: V.DeleteOneDb = async (where) =>
  prisma.board.delete({ where });
