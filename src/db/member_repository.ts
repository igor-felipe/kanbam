import { prisma } from "./prisma";
import * as V from "../validators/member_validator";

const select = {
  role: true,
  userId: true,
  workspaceId: true,
};

export const create: V.CreateDb = async ({ userId, workspaceId, ...data }) =>
  prisma.member.create({
    data: {
      ...data,
      workspace: { connect: { id: workspaceId } },
      User: { connect: { id: userId } },
    },
    select,
  }) as Promise<V.CreateDbOutput>;

export const update: V.UpdateDb = async ({ userId, workspaceId, role }) =>
  prisma.member.update({
    where: {
      workspaceId_userId: {
        workspaceId,
        userId,
      },
    },
    data: {
      role,
    },
    select,
  }) as Promise<V.UpdateDbOutput>;

export const getOne: V.GetOneDb = async ({ userId, workspaceId }) =>
  prisma.member.findUniqueOrThrow({
    where: {
      workspaceId_userId: {
        workspaceId,
        userId,
      },
    },
    select,
  }) as Promise<V.GetOneDbOutput>;

export const findMany: V.FindManyDb = async (where) =>
  prisma.member.findMany({ where, select }) as Promise<V.FindManyDbOutput>;

export const deleteOne: V.DeleteOneDb = async ({ userId, workspaceId }) =>
  prisma.member.delete({
    where: {
      workspaceId_userId: {
        workspaceId,
        userId,
      },
    },
    select,
  }) as Promise<V.DeleteOneDbOutput>;

export const authorization: V.AuthorizationDb = async (input) =>
  prisma.member
    .findUniqueOrThrow({
      where: {
        workspaceId_userId: {
          workspaceId: input.workspaceId,
          userId: input.userId,
        },
      },
      select,
    })
    .then((e) => e as V.AuthorizationDbOutput)
    .catch(() => {
      throw new Error("Unauthorized");
    });
