import { z } from "zod";
import { validatorAdapter } from "./helpers";
import { member } from "./member_validator";
import { label } from "./board_validator";

const dataValidator = z
  .date()
  .or(z.string())
  .refine((v) => new Date(v));

const activity = z.object({
  userId: z.string(),
  action: z.string(),
  date: dataValidator,
});

const comment = z.object({
  userId: z.string(),
  content: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const priority = z.enum(["low", "medium", "high"]);

export const card = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1).trim(),
  description: z.string().trim().nullish(),
  priority: priority.nullish(),
  cover: z.string().nullish(),
  archived: z.boolean(),
  dueDate: z.date().nullish(),
  updatedAt: dataValidator,
  createdAt: dataValidator,
  columnId: z.string().min(1).trim(),
  members: z.array(member.pick({ userId: true })).optional(),
  comments: z.array(comment).optional(),
  labels: z.array(label).optional(),
  activity: z.array(activity),
});

export type Card = z.infer<typeof card>;
export type Activity = z.infer<typeof activity>;
export type Comment = z.infer<typeof comment>;
export type Label = z.infer<typeof label>;
export type Priority = z.infer<typeof priority>;

export const createInput = card
  .omit({
    id: true,
    archived: true,
  })
  .partial({
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    activity: activity.partial().required({ action: true }),
  })
  .extend({ labels: z.number().int().positive().array().optional() })
  .extend({
    comments: z.array(comment.pick({ content: true })),
  })
  .extend({
    members: z
      .array(member.pick({ userId: true, workspaceId: true }))
      .optional(),
  })
  .extend({ userId: z.string() });

export const createDbInput = card
  .omit({
    id: true,
  })
  .partial({
    createdAt: true,
    updatedAt: true,
  })
  .extend({ labels: z.number().int().positive().array().optional() })
  .extend({
    activity,
  })
  .extend({
    comments: z.array(comment),
  })
  .extend({
    members: z
      .array(member.pick({ userId: true, workspaceId: true }))
      .optional(),
  });

export const createDbOutput = card;
export const createOutput = card;

export type CreateInput = z.infer<typeof createInput>;
export type CreateOutput = z.infer<typeof createOutput>;
export type Create = (input: CreateInput) => Promise<CreateOutput>;
export type CreateDbInput = z.infer<typeof createDbInput>;
export type CreateDbOutput = z.infer<typeof createDbOutput>;
export type CreateDb = (input: CreateDbInput) => Promise<CreateDbOutput>;
export const createValidator = validatorAdapter(createInput);
// ------------------------------------
export const updateDbInput = card
  .omit({
    createdAt: true,
    updatedAt: true,
  })
  .extend({ activity })
  .extend({
    members: z
      .array(member.pick({ userId: true, workspaceId: true }))
      .optional(),
  })
  .partial()
  .required({ id: true });

export const updateInput = updateDbInput.extend({ userId: z.string() }).extend({
  activity: activity
    .required({ action: true })
    .partial({ date: true, userId: true }),
});

export const updateOutput = card;
export const updateDbOutput = card;

export type UpdateInput = z.infer<typeof updateInput>;
export type UpdateDbInput = z.infer<typeof updateDbInput>;
export type UpdateDbOutput = z.infer<typeof updateDbOutput>;
export type UpdateOutput = z.infer<typeof updateOutput>;
export type UpdateDb = (input: UpdateDbInput) => Promise<UpdateDbOutput>;
export type Update = (input: UpdateInput) => Promise<UpdateOutput>;
export const updateValidator = validatorAdapter(updateInput);
// ------------------------------------
export const getOneInput = card.pick({ id: true });
export const getOneDbInput = getOneInput;
export const getOneDbOutput = card;
export const getOneOutput = card;

export type GetOneInput = z.infer<typeof getOneInput>;
export type GetOneOutput = z.infer<typeof getOneOutput>;
export type GetOne = (input: GetOneInput) => Promise<GetOneOutput>;
export type GetOneDbInput = z.infer<typeof getOneDbInput>;
export type GetOneDbOutput = z.infer<typeof getOneDbOutput>;
export type GetOneDb = (input: GetOneDbInput) => Promise<GetOneDbOutput>;
export const getOneValidator = validatorAdapter(getOneInput);
// ------------------------------------
export const findManyInput = card
  .omit({ labels: true, members: true, activity: true, comments: true })
  .extend({ label, member, activity, comment })
  .partial();
export const findManyDbInput = findManyInput;
export const findManyDbOutput = card.array();
export const findManyOutput = card.array();

export type FindManyInput = z.infer<typeof findManyInput>;
export type FindManyOutput = z.infer<typeof findManyDbOutput>;
export type FindMany = (input: FindManyInput) => Promise<FindManyOutput>;
export type FindManyDbInput = z.infer<typeof findManyDbInput>;
export type FindManyDbOutput = z.infer<typeof findManyDbOutput>;
export type FindManyDb = (input: FindManyDbInput) => Promise<FindManyDbOutput>;
export const findManyValidator = validatorAdapter(findManyInput);
// ------------------------------------
export const deleteOneInput = card.pick({ id: true, workspace: true });
export const deleteOneDbInput = deleteOneInput;
export const deleteOneDbOutput = card;
export const deleteOneOutput = card;

export type DeleteOneInput = z.infer<typeof deleteOneInput>;
export type DeleteOneOutput = z.infer<typeof deleteOneOutput>;
export type DeleteOne = (input: DeleteOneInput) => Promise<DeleteOneOutput>;
export type DeleteOneDbInput = z.infer<typeof deleteOneDbInput>;
export type DeleteOneDbOutput = z.infer<typeof deleteOneDbOutput>;
export type DeleteOneDb = (
  input: DeleteOneDbInput,
) => Promise<DeleteOneDbOutput>;
export const deleteOneValidator = validatorAdapter(deleteOneInput);
