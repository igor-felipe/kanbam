import { z } from "zod";
import { validatorAdapter } from "./helpers";

export const column = z.object({
  id: z.string().min(3).trim(),
  name: z.string().min(3).trim(),
  description: z.string(),
  wip: z.number().int().positive(),
  boardId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  cardOrder: z.number().int().positive().array().optional(),
});
export type Column = z.infer<typeof column>;

export const createInput = column.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const createDbInput = createInput;
export const createDbOutput = column;
export const createOutput = column;

export type CreateInput = z.infer<typeof createInput>;
export type CreateOutput = z.infer<typeof createOutput>;
export type Create = (input: CreateInput) => Promise<CreateOutput>;
export type CreateDbInput = z.infer<typeof createDbInput>;
export type CreateDbOutput = z.infer<typeof createDbOutput>;
export type CreateDb = (input: CreateDbInput) => Promise<CreateDbOutput>;
export const createValidator = validatorAdapter(createInput);
// ------------------------------------
export const updateInput = column.partial().required({ id: true }).omit({
  createdAt: true,
  updatedAt: true,
});
export const updateDbInput = updateInput;
export const updateOutput = column;
export const updateDbOutput = column;

export type UpdateInput = z.infer<typeof updateInput>;
export type UpdateOutput = z.infer<typeof updateOutput>;
export type Update = (input: UpdateInput) => Promise<UpdateOutput>;
export type UpdateDbInput = z.infer<typeof updateDbInput>;
export type UpdateDbOutput = z.infer<typeof updateDbOutput>;
export type UpdateDb = (input: UpdateDbInput) => Promise<UpdateDbOutput>;
export const updateValidator = validatorAdapter(updateInput);
// ------------------------------------
export const getOneInput = column.pick({ id: true });
export const getOneDbInput = getOneInput;
export const getOneDbOutput = column;
export const getOneOutput = column;

export type GetOneInput = z.infer<typeof getOneInput>;
export type GetOneOutput = z.infer<typeof getOneOutput>;
export type GetOne = (input: GetOneInput) => Promise<GetOneOutput>;
export type GetOneDbInput = z.infer<typeof getOneDbInput>;
export type GetOneDbOutput = z.infer<typeof getOneDbOutput>;
export type GetOneDb = (input: GetOneDbInput) => Promise<GetOneDbOutput>;
export const getOneValidator = validatorAdapter(getOneInput);
// ------------------------------------
export const findManyInput = column.partial();
export const findManyDbInput = column.partial();
export const findManyDbOutput = column.array();
export const findManyOutput = column.array();

export type FindManyInput = z.infer<typeof findManyInput>;
export type FindManyOutput = z.infer<typeof findManyDbOutput>;
export type FindMany = (input: FindManyInput) => Promise<FindManyOutput>;
export type FindManyDbInput = z.infer<typeof findManyDbInput>;
export type FindManyDbOutput = z.infer<typeof findManyDbOutput>;
export type FindManyDb = (input: FindManyDbInput) => Promise<FindManyDbOutput>;
export const findManyValidator = validatorAdapter(findManyInput);
// ------------------------------------
export const deleteOneInput = column.pick({ id: true, column: true });
export const deleteOneDbInput = deleteOneInput;
export const deleteOneDbOutput = column;
export const deleteOneOutput = column;

export type DeleteOneInput = z.infer<typeof deleteOneInput>;
export type DeleteOneOutput = z.infer<typeof deleteOneOutput>;
export type DeleteOne = (input: DeleteOneInput) => Promise<DeleteOneOutput>;
export type DeleteOneDbInput = z.infer<typeof deleteOneDbInput>;
export type DeleteOneDbOutput = z.infer<typeof deleteOneDbOutput>;
export type DeleteOneDb = (
  input: DeleteOneDbInput,
) => Promise<DeleteOneDbOutput>;
export const deleteOneValidator = validatorAdapter(deleteOneInput);
