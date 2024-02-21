import { z } from "zod";
import { validatorAdapter } from "./helpers";
import { auth } from "./user_validator";

export const role = z.enum(["admin", "user"]);
export type Role = z.infer<typeof role>;

export const member = z.object({
  workspaceId: z.string(),
  role,
  userId: z.string(),
});

export type Member = z.infer<typeof member>;

export const createInput = member;
export const createDbInput = createInput;
export const createDbOutput = createInput;
export const createOutput = createInput;

export type CreateInput = z.infer<typeof createInput>;
export type CreateOutput = z.infer<typeof createOutput>;
export type Create = (input: CreateInput) => Promise<CreateOutput>;
export type CreateDbInput = z.infer<typeof createDbInput>;
export type CreateDbOutput = z.infer<typeof createDbOutput>;
export type CreateDb = (input: CreateDbInput) => Promise<CreateDbOutput>;
export const createValidator = validatorAdapter(createInput);
// ------------------------------------
export const updateInput = createInput
  .partial()
  .required({ workspaceId: true, userId: true })
  .extend({
    auth,
  });
export const updateDbInput = createInput
  .partial()
  .required({ workspaceId: true, userId: true });
export const updateOutput = member;
export const updateDbOutput = member;

export type UpdateInput = z.infer<typeof updateInput>;
export type UpdateOutput = z.infer<typeof updateOutput>;
export type Update = (input: UpdateInput) => Promise<UpdateOutput>;
export type UpdateDbInput = z.infer<typeof updateDbInput>;
export type UpdateDbOutput = z.infer<typeof updateDbOutput>;
export type UpdateDb = (input: UpdateDbInput) => Promise<UpdateDbOutput>;
export const updateValidator = validatorAdapter(updateInput);
// ------------------------------------
export const getOneInput = member.pick({ workspaceId: true, userId: true });
export const getOneDbInput = getOneInput;
export const getOneDbOutput = member;
export const getOneOutput = member;

export type GetOneInput = z.infer<typeof getOneInput>;
export type GetOneOutput = z.infer<typeof getOneOutput>;
export type GetOne = (input: GetOneInput) => Promise<GetOneOutput>;
export type GetOneDbInput = z.infer<typeof getOneDbInput>;
export type GetOneDbOutput = z.infer<typeof getOneDbOutput>;
export type GetOneDb = (input: GetOneDbInput) => Promise<GetOneDbOutput>;
export const getOneValidator = validatorAdapter(getOneInput);
// ------------------------------------
export const findManyInput = member.partial();
export const findManyDbInput = findManyInput;
export const findManyDbOutput = member.array();
export const findManyOutput = member.array();

export type FindManyInput = z.infer<typeof findManyInput>;
export type FindManyOutput = z.infer<typeof findManyDbOutput>;
export type FindMany = (input: FindManyInput) => Promise<FindManyOutput>;
export type FindManyDbInput = z.infer<typeof findManyDbInput>;
export type FindManyDbOutput = z.infer<typeof findManyDbOutput>;
export type FindManyDb = (input: FindManyDbInput) => Promise<FindManyDbOutput>;
export const findManyValidator = validatorAdapter(findManyInput);
// ------------------------------------
export const deleteOneInput = member
  .pick({
    workspaceId: true,
    userId: true,
  })
  .extend({
    auth,
  });
export const deleteOneDbInput = member.pick({
  workspaceId: true,
  userId: true,
});
export const deleteOneDbOutput = member;
export const deleteOneOutput = member;

export type DeleteOneInput = z.infer<typeof deleteOneInput>;
export type DeleteOneOutput = z.infer<typeof deleteOneOutput>;
export type DeleteOne = (input: DeleteOneInput) => Promise<DeleteOneOutput>;
export type DeleteOneDbInput = z.infer<typeof deleteOneDbInput>;
export type DeleteOneDbOutput = z.infer<typeof deleteOneDbOutput>;
export type DeleteOneDb = (
  input: DeleteOneDbInput,
) => Promise<DeleteOneDbOutput>;
export const deleteOneValidator = validatorAdapter(deleteOneInput);
// ------------------------------------
export const authorizationInput = member.partial({ role: true });
export const authorizationDbInput = authorizationInput;
export const authorizationDbOutput = authorizationInput;
export const authorizationOutput = authorizationInput;
export const authorizationValidator = validatorAdapter(authorizationInput);

export type AuthorizationInput = z.infer<typeof authorizationInput>;
export type AuthorizationDbInput = z.infer<typeof authorizationDbInput>;
export type AuthorizationDbOutput = z.infer<typeof authorizationDbOutput>;
export type AuthorizationOutput = z.infer<typeof authorizationOutput>;
export type Authorization = (
  input: AuthorizationInput,
) => Promise<AuthorizationOutput>;
export type AuthorizationDb = (
  input: AuthorizationDbInput,
) => Promise<AuthorizationDbOutput>;
export const authorization = validatorAdapter(authorizationInput);
