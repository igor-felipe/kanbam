import { z } from "zod";
import { validatorAdapter } from "./helpers";

export const user = z.object({
  id: z.string(),
  password: z.string().min(8).trim(),
  email: z.string().email().trim().toLowerCase(),
  name: z.string().trim().toLowerCase(),
});
export type User = z.infer<typeof user>;

export const auth = z.object({
  id: z.string(),
  iat: z.number().optional(),
  exp: z.number().optional(),
});
export type Auth = z.infer<typeof auth>;

export const createInput = user.omit({ id: true });
export const createDbInput = user.omit({ id: true });
export const createDbOutput = user.omit({ password: true });
export const createOutput = user.omit({ password: true });
export const createValidator = validatorAdapter(createInput);

export type CreateInput = z.infer<typeof createInput>;
export type CreateOutput = z.infer<typeof createOutput>;
export type Create = (input: CreateInput) => Promise<CreateDbOutput>;
export type CreateDbOutput = z.infer<typeof createDbOutput>;
export type CreateDbInput = z.infer<typeof createDbInput>;
export type CreateDb = (input: CreateDbInput) => Promise<CreateDbOutput>;

export const updateInput = user.partial().required({ id: true });
export const updateDbInput = user.partial().required({ id: true });
export const updateDbOutput = user.omit({ password: true });
export const updateOutput = user.omit({ password: true });
export const updateValidator = validatorAdapter(updateInput);

export type UpdateInput = z.infer<typeof updateInput>;
export type UpdateOutput = z.infer<typeof updateDbOutput>;
export type Update = (input: UpdateInput) => Promise<UpdateOutput>;
export type UpdateDbInput = z.infer<typeof updateDbInput>;
export type UpdateDbOutput = z.infer<typeof updateDbOutput>;
export type UpdateDb = (input: UpdateDbInput) => Promise<UpdateDbOutput>;

export const getOneInput = user.pick({ id: true });
export const getOneDbInput = getOneInput;
export const getOneDbOutput = user.omit({ password: true });
export const getOneOutput = getOneDbOutput;
export const getOneValidator = validatorAdapter(getOneInput);

export type GetOneInput = z.infer<typeof getOneInput>;
export type GetOneDbInput = z.infer<typeof getOneDbInput>;
export type GetOne = (input: GetOneInput) => Promise<GetOneOutput>;
export type GetOneDbOutput = z.infer<typeof getOneDbOutput>;
export type GetOneOutput = z.infer<typeof getOneOutput>;
export type GetOneDb = (input: GetOneDbInput) => Promise<GetOneDbOutput>;

export const findManyInput = user.omit({ password: true }).partial();
export const findManyDbInput = findManyInput;
export const findManyDbOutput = user.omit({ password: true }).array();
export const findManyOutput = findManyDbOutput;
export const findManyValidator = validatorAdapter(findManyInput);

export type FindManyInput = z.infer<typeof findManyInput>;
export type FindManyDbInput = z.infer<typeof findManyDbInput>;
export type FindManyDbOutput = z.infer<typeof findManyDbOutput>;
export type FindManyOutput = z.infer<typeof findManyOutput>;
export type FindMany = (input: FindManyInput) => Promise<FindManyDbOutput>;
export type FindManyDb = (input: FindManyDbInput) => Promise<FindManyDbOutput>;

export const deleteOneInput = user.pick({ id: true });
export const deleteOneDbInput = deleteOneInput;
export const deleteOneDbOutput = user.omit({ password: true });
export const deleteOneOutput = user.omit({ password: true });
export const deleteOneValidator = validatorAdapter(deleteOneInput);

export type DeleteOneInput = z.infer<typeof deleteOneInput>;
export type DeleteOneDbInput = z.infer<typeof deleteOneDbInput>;
export type DeleteOneDbOutput = z.infer<typeof deleteOneDbOutput>;
export type DeleteOneOutput = z.infer<typeof deleteOneOutput>;
export type DeleteOne = (input: DeleteOneInput) => Promise<DeleteOneDbOutput>;
export type DeleteOneDb = (
  input: DeleteOneDbInput,
) => Promise<DeleteOneDbOutput>;

export const loginInput = user.pick({ email: true, password: true });
export const loginDbInput = loginInput;
export const loginDbOutput = user;
export const loginOutput = z.string();
export const loginValidator = validatorAdapter(loginInput);

export type LoginInput = z.infer<typeof loginInput>;
export type LoginOutput = z.infer<typeof loginOutput>;
export type LoginDbInput = z.infer<typeof loginDbInput>;
export type LoginDbOutput = z.infer<typeof loginDbOutput>;
export type Login = (input: LoginInput) => Promise<LoginOutput>;
export type LoginDb = (input: LoginDbInput) => Promise<LoginDbOutput>;
