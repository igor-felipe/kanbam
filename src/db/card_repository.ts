import { prisma } from "./prisma";
import * as V from "../validators/card_validator";

const select = {
  member: { select: { userId: true } },
  activity: true,
  archived: true,
  cover: true,
  columnId: true,
  comments: true,
  createdAt: true,
  description: true,
  dueDate: true,
  id: true,
  labels: { select: { id: true, name: true, color: true } },
  priority: true,
  title: true,
  updatedAt: true,
};

export const create: V.CreateDb = async ({
  columnId,
  labels,
  activity,
  comments,
  members,
  ...data
}) => {
  const card = await prisma.card.create({
    data: {
      ...data,
      archived: false,
      cover: null,
      column: { connect: { id: columnId } },
      activity: { set: [activity] },
      comments: { set: comments },
    },
  });

  const connectMembers = members?.map((member) =>
    prisma.member.update({
      where: { workspaceId_userId: member },
      data: {
        Card: { connect: { id: card.id } },
      },
      select: { userId: true },
    }),
  );

  const connectLabels = labels?.map((label) =>
    prisma.label.update({
      where: { id: label },
      data: {
        Card: { connect: { id: card.id } },
      },
      select: { id: true, name: true, color: true },
    }),
  );

  const membersArray = await Promise.all(connectMembers ?? []);
  const labelsArray = await Promise.all(connectLabels ?? []);

  await prisma.column.update({
    where: { id: card.columnId },
    data: {
      cardOrder: { push: card.id },
    },
  });

  return {
    ...card,
    members: membersArray,
    labels: labelsArray,
    activity: [activity] as any,
    comments: comments as any,
  };
};

export const update: V.UpdateDb = async ({
  columnId,
  labels,
  activity,
  comments,
  members,
  id,
  ...data
}) => {
  const previousData = await prisma.card.findFirst({
    where: { id },
    select: {
      activity: true,
      comments: true,
      labels: { select: { id: true, name: true, color: true } },
      member: { select: { userId: true } },
    },
  });

  const card = await prisma.card.update({
    where: { id },
    data: {
      ...data,
      column: columnId ? { connect: { id: columnId } } : undefined,
      activity: activity ? { push: activity } : undefined,
      comments: comments
        ? { set: [...((previousData?.comments ?? []) as any), ...comments] }
        : undefined,
    },
  });

  const connectMembers = members
    ? members.map((member) =>
        prisma.member.update({
          where: { workspaceId_userId: member },
          data: {
            Card: { connect: { id: card.id } },
          },
          select: { userId: true },
        }),
      )
    : [];

  const connectLabels = labels
    ? labels.map((label) =>
        prisma.label.update({
          where: { id: label.id },
          data: {
            Card: { connect: { id: card.id } },
          },
          select: { id: true, name: true, color: true },
        }),
      )
    : [];

  const membersArray = await Promise.all(connectMembers);
  const labelsArray = await Promise.all(connectLabels);

  return {
    ...card,
    members: membersArray.length > 0 ? membersArray : previousData?.member,
    labels: labelsArray.length > 0 ? labelsArray : previousData?.labels,
    activity: card.activity as any,
    comments: comments || (previousData?.comments as any),
  };
};

export const findMany: V.FindManyDb = async ({
  columnId,
  label,
  member,
  activity,
  comment,
  ...input
}) => {
  const cards = await prisma.card.findMany({
    where: {
      ...input,
      column: columnId ? { id: columnId } : undefined,
      labels: label ? { some: { ...label } } : undefined,
      member: member ? { some: { ...member } } : undefined,
      activity: activity ? { has: { ...activity } } : undefined,
      comments: comment ? { has: { ...comment } } : undefined,
    },
    select,
  });

  return cards.map(
    ({ member: members, labels, comments, activity: $activity, ...card }) => ({
      ...card,
      members,
      activity: $activity as any,
      comments: comments as any,
      labels,
    }),
  );
};

export const getOne: V.GetOneDb = async (where) => {
  const { member, labels, comments, activity, ...card } =
    await prisma.card.findUniqueOrThrow({
      where,
      select,
    });

  return {
    ...card,
    members: member,
    activity: activity as any,
    comments: comments as any,
    labels,
  };
};

export const deleteOne: V.DeleteOne = async (where) => {
  const { member, labels, comments, activity, ...card } =
    await prisma.card.delete({
      where,
      select,
    });

  const column = await prisma.column.findUnique({
    where: { id: card.columnId },
    select: { cardOrder: true },
  });

  await prisma.column.update({
    where: { id: card.columnId },
    data: {
      cardOrder: { set: column?.cardOrder.filter((id) => id !== card.id) },
    },
  });

  return {
    ...card,
    members: member,
    activity: activity as any,
    comments: comments as any,
    labels,
  };
};
