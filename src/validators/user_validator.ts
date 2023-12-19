import { z } from "zod";

export const user = z.object({
  id: z.string(),
  password: z.string().min(8).trim(),
  email: z.string().email().trim().toLowerCase(),
  name: z.string().trim().toLowerCase(),
  role: z.nativeEnum({
    USER: "USER",
    ADMIN: "ADMIN",
  }),
});
export type User = z.infer<typeof user>;

export const createValidator = user.omit({ id: true });
export const createDbInput = user.omit({ id: true });
export const createDbOutput = user.omit({ password: true });
export type CreateValidator = z.infer<typeof createValidator>;
export type CreateUcInput = z.infer<typeof createValidator>;
export type CreateDbInput = z.infer<typeof createDbInput>;
export type CreateDbOutput = z.infer<typeof createDbOutput>;
export type CreateDb = (input: CreateDbInput) => Promise<CreateDbOutput>;

export const updateValidator = user.partial().required({ id: true });
export const updateDbInput = user.partial().required({ id: true });
export const updateDbOutput = user.omit({ password: true });
export type UpdateValidator = z.infer<typeof updateValidator>;
export type UpdateUcInput = z.infer<typeof updateValidator>;
export type UpdateDbInput = z.infer<typeof updateDbInput>;
export type UpdateDbOutput = z.infer<typeof updateDbOutput>;
export type UpdateDb = (input: UpdateDbInput) => Promise<UpdateDbOutput>;

export const getOneValidator = user.pick({ id: true });
export const getOneDbInput = user.pick({ id: true });
export const getOneDbOutput = user.omit({ password: true });
export type GetOneValidator = z.infer<typeof getOneValidator>;
export type GetOneUcInput = z.infer<typeof getOneValidator>;
export type GetOneDbInput = z.infer<typeof getOneDbInput>;
export type GetOneDbOutput = z.infer<typeof getOneDbOutput>;
export type GetOneDb = (input: GetOneDbInput) => Promise<GetOneDbOutput>;

export const findManyValidator = user.partial().omit({ password: true });
export const findManyDbInput = user.partial().omit({ password: true });
export const findManyDbOutput = user.omit({ password: true }).array();
export type FindManyValidator = z.infer<typeof findManyValidator>;
export type FindManyUcInput = z.infer<typeof findManyValidator>;
export type FindManyDbInput = z.infer<typeof findManyDbInput>;
export type FindManyDbOutput = z.infer<typeof findManyDbOutput>;
export type FindManyDb = (input: FindManyDbInput) => Promise<FindManyDbOutput>;

export const loginValidator = user.pick({ email: true, password: true });
export const loginUcInput = user.pick({ email: true, password: true });
export const loginDbInput = user.pick({ email: true, password: true });
export const loginDbOutput = user;
export type LoginValidator = z.infer<typeof loginValidator>;
export type LoginUcInput = z.infer<typeof loginUcInput>;
export type LoginDbInput = z.infer<typeof loginDbInput>;
export type LoginDbOutput = z.infer<typeof loginDbOutput>;
export type LoginDb = (input: LoginDbInput) => Promise<LoginDbOutput>;
