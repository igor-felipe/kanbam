import { prisma } from "./prisma";
import * as V from "../validators/column_validator";

export const create: V.CreateDb = async ({
  boardId,
  cardOrder,
  ...data
}: V.CreateDbInput) => {
  const column = await prisma.column.create({
    data: {
      ...data,
      board: { connect: { id: boardId } },
      cardOrder: cardOrder ? { set: cardOrder } : undefined,
    },
  });
  await prisma.board.update({
    where: { id: boardId },
    data: { columnOrder: { push: column.id } },
  });

  return column;
};

export const update: V.UpdateDb = async ({ id, boardId, ...data }) =>
  prisma.column.update({
    where: { id },
    data: {
      ...data,
      board: { connect: { id: boardId } },
      cardOrder: data.cardOrder ? { set: data.cardOrder } : undefined,
    },
  });

export const findMany: V.FindManyDb = async ({
  boardId,
  cardOrder,
  ...where
}) =>
  prisma.column.findMany({
    where: { ...where, board: { id: boardId } },
  });

export const getOne: V.GetOneDb = async (where) =>
  prisma.column.findUniqueOrThrow({ where });

export const deleteOne: V.DeleteOneDb = async (input) => {
  const column = await prisma.column.delete({ where: { id: input.id } });

  const board = await prisma.board.findFirstOrThrow({
    where: { id: column.boardId },
    select: { columnOrder: true },
  });

  await prisma.board.update({
    where: { id: column.boardId },
    data: {
      columnOrder: {
        set: board.columnOrder.filter((id) => id !== column.id),
      },
    },
    select: { id: true },
  });

  return column;
};
