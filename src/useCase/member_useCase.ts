import * as V from "../validators/member_validator";
import * as DB from "../db/member_repository";

export const { create } = DB;

export const update: V.Update = async ({ auth, ...input }) => {
  const { role } = await DB.authorization({
    workspaceId: input.workspaceId,
    userId: input.userId,
  });
  const updateYourself = auth.id === input.userId;
  const updateOther = !updateYourself;
  const isAdmin = role === "admin";
  const isUpdatingRoleToAdmin = input.role === "admin";
  const isUpdatingRoleToUser = input.role === "user";

  if (!isAdmin && updateOther) {
    throw new Error("Only admin can update other members");
  }

  if (!isAdmin && updateYourself && isUpdatingRoleToAdmin) {
    throw new Error("Ask admin to update your role to admin");
  }

  if (isAdmin && updateYourself && isUpdatingRoleToUser) {
    const members = await DB.findMany({
      workspaceId: input.workspaceId,
      role: "admin",
    });
    if (members.length === 1)
      throw new Error("Cannot remove last admin from member");
  }

  return DB.update(input);
};

export const { getOne } = DB;

export const { findMany } = DB;

export const deleteOne: V.DeleteOne = async ({ auth, ...input }) => {
  const { role } = await DB.authorization({
    workspaceId: input.workspaceId,
    userId: auth.id,
  });

  const deleteYourself = auth.id === input.userId;
  const deleteOther = !deleteYourself;
  const isAdmin = role === "admin";

  if (!isAdmin && deleteOther) {
    throw new Error("Only admin can delete other members");
  }

  if (isAdmin && deleteYourself) {
    const members = await DB.findMany({
      workspaceId: input.workspaceId,
      role: "admin",
    });
    if (members.length === 1)
      throw new Error("Cannot remove last admin from member");
  }

  return DB.deleteOne(input);
};

export const { authorization } = DB;
