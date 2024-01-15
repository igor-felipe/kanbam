import { z } from "zod";
import { validatorAdapter } from "./helpers";

export const role = z.enum(["admin", "user"]);
export type Role = z.infer<typeof role>;

export const workspace = z.object({
  id: z.string().min(3).trim(),
  name: z.string().min(3).trim(),
  userId: z.string(),
});
export type Workspace = z.infer<typeof workspace>;

export const createInput = workspace.omit({ id: true });
export const createDbInput = createInput;
export const createDbOutput = workspace;
export const createOutput = workspace;

export type CreateInput = z.infer<typeof createInput>;
export type CreateOutput = z.infer<typeof createOutput>;
export type Create = (input: CreateInput) => Promise<CreateOutput>;
export type CreateDbInput = z.infer<typeof createDbInput>;
export type CreateDbOutput = z.infer<typeof createDbOutput>;
export type CreateDb = (input: CreateDbInput) => Promise<CreateDbOutput>;
export const createValidator = validatorAdapter(createInput);
// ------------------------------------
export const updateInput = workspace.partial().required({ id: true });
export const updateDbInput = updateInput;
export const updateOutput = workspace;
export const updateDbOutput = workspace;

export type UpdateInput = z.infer<typeof updateInput>;
export type UpdateOutput = z.infer<typeof updateOutput>;
export type Update = (input: UpdateInput) => Promise<UpdateOutput>;
export type UpdateDbInput = z.infer<typeof updateDbInput>;
export type UpdateDbOutput = z.infer<typeof updateDbOutput>;
export type UpdateDb = (input: UpdateDbInput) => Promise<UpdateDbOutput>;
export const updateValidator = validatorAdapter(updateInput);
// ------------------------------------
export const getOneInput = workspace.pick({ id: true });
export const getOneDbInput = getOneInput;
export const getOneDbOutput = workspace;
export const getOneOutput = workspace;

export type GetOneInput = z.infer<typeof getOneInput>;
export type GetOneOutput = z.infer<typeof getOneOutput>;
export type GetOne = (input: GetOneInput) => Promise<GetOneOutput>;
export type GetOneDbInput = z.infer<typeof getOneDbInput>;
export type GetOneDbOutput = z.infer<typeof getOneDbOutput>;
export type GetOneDb = (input: GetOneDbInput) => Promise<GetOneDbOutput>;
export const getOneValidator = validatorAdapter(getOneInput);
// ------------------------------------
export const findManyInput = workspace.partial();
export const findManyDbInput = workspace.partial();
export const findManyDbOutput = workspace.array();
export const findManyOutput = workspace.array();

export type FindManyInput = z.infer<typeof findManyInput>;
export type FindManyOutput = z.infer<typeof findManyDbOutput>;
export type FindMany = (input: FindManyInput) => Promise<FindManyOutput>;
export type FindManyDbInput = z.infer<typeof findManyDbInput>;
export type FindManyDbOutput = z.infer<typeof findManyDbOutput>;
export type FindManyDb = (input: FindManyDbInput) => Promise<FindManyDbOutput>;
export const findManyValidator = validatorAdapter(findManyInput);
// ------------------------------------
export const deleteOneInput = workspace.pick({ id: true, userId: true });
export const deleteOneDbInput = deleteOneInput;
export const deleteOneDbOutput = workspace;
export const deleteOneOutput = workspace;

export type DeleteOneInput = z.infer<typeof deleteOneInput>;
export type DeleteOneOutput = z.infer<typeof deleteOneOutput>;
export type DeleteOne = (input: DeleteOneInput) => Promise<DeleteOneOutput>;
export type DeleteOneDbInput = z.infer<typeof deleteOneDbInput>;
export type DeleteOneDbOutput = z.infer<typeof deleteOneDbOutput>;
export type DeleteOneDb = (
  input: DeleteOneDbInput,
) => Promise<DeleteOneDbOutput>;
export const deleteOneValidator = validatorAdapter(deleteOneInput);
