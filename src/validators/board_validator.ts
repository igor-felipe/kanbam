import { z } from "zod";
import { validatorAdapter } from "./helpers";

export const label = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).trim(),
  color: z.string(),
});

export const board = z.object({
  id: z.string().min(3).trim(),
  name: z.string().min(3).trim(),
  description: z.string(),
  workspaceId: z.string(),
  labels: z.array(label),
  createdAt: z.date(),
  updatedAt: z.date(),
  columnOrder: z.string().array().optional(),
});

export type Board = z.infer<typeof board>;

export const createInput = board
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({ labels: z.array(label.omit({ id: true })) });
export const createDbInput = createInput;
export const createDbOutput = board;
export const createOutput = createDbOutput;

export type CreateInput = z.infer<typeof createInput>;
export type CreateOutput = z.infer<typeof createOutput>;
export type Create = (input: CreateInput) => Promise<CreateOutput>;
export type CreateDbInput = z.infer<typeof createDbInput>;
export type CreateDbOutput = z.infer<typeof createDbOutput>;
export type CreateDb = (input: CreateDbInput) => Promise<CreateDbOutput>;
export const createValidator = validatorAdapter(createInput);
// ------------------------------------
export const updateInput = board
  .extend({ labels: label.array() })
  .omit({
    createdAt: true,
    updatedAt: true,
  })
  .partial()
  .required({ id: true });
export const updateDbInput = updateInput;
export const updateOutput = board;
export const updateDbOutput = board;

export type UpdateInput = z.infer<typeof updateInput>;
export type UpdateOutput = z.infer<typeof updateOutput>;
export type Update = (input: UpdateInput) => Promise<UpdateOutput>;
export type UpdateDbInput = z.infer<typeof updateDbInput>;
export type UpdateDbOutput = z.infer<typeof updateDbOutput>;
export type UpdateDb = (input: UpdateDbInput) => Promise<UpdateDbOutput>;
export const updateValidator = validatorAdapter(updateInput);
// ------------------------------------
export const getOneInput = board.pick({ id: true });
export const getOneDbInput = getOneInput;
export const getOneDbOutput = board;
export const getOneOutput = board;

export type GetOneInput = z.infer<typeof getOneInput>;
export type GetOneOutput = z.infer<typeof getOneOutput>;
export type GetOne = (input: GetOneInput) => Promise<GetOneOutput>;
export type GetOneDbInput = z.infer<typeof getOneDbInput>;
export type GetOneDbOutput = z.infer<typeof getOneDbOutput>;
export type GetOneDb = (input: GetOneDbInput) => Promise<GetOneDbOutput>;
export const getOneValidator = validatorAdapter(getOneInput);
// ------------------------------------
export const findManyInput = board
  .omit({ labels: true })
  .extend({ label })
  .partial();
export const findManyDbInput = findManyInput;
export const findManyDbOutput = board.array();
export const findManyOutput = board.array();

export type FindManyInput = z.infer<typeof findManyInput>;
export type FindManyOutput = z.infer<typeof findManyDbOutput>;
export type FindMany = (input: FindManyInput) => Promise<FindManyOutput>;
export type FindManyDbInput = z.infer<typeof findManyDbInput>;
export type FindManyDbOutput = z.infer<typeof findManyDbOutput>;
export type FindManyDb = (input: FindManyDbInput) => Promise<FindManyDbOutput>;
export const findManyValidator = validatorAdapter(findManyInput);
// ------------------------------------
export const deleteOneInput = board.pick({ id: true, workspace: true });
export const deleteOneDbInput = deleteOneInput;
export const deleteOneDbOutput = board;
export const deleteOneOutput = board;

export type DeleteOneInput = z.infer<typeof deleteOneInput>;
export type DeleteOneOutput = z.infer<typeof deleteOneOutput>;
export type DeleteOne = (input: DeleteOneInput) => Promise<DeleteOneOutput>;
export type DeleteOneDbInput = z.infer<typeof deleteOneDbInput>;
export type DeleteOneDbOutput = z.infer<typeof deleteOneDbOutput>;
export type DeleteOneDb = (
  input: DeleteOneDbInput,
) => Promise<DeleteOneDbOutput>;
export const deleteOneValidator = validatorAdapter(deleteOneInput);
