import * as DB from "../db/card_repository";
import * as V from "../validators/card_validator";

export const create: V.Create = ({ userId, ...data }) => {
  const card = DB.create({
    ...data,
    archived: false,
    activity: {
      date: new Date(),
      userId,
      action: data.activity.action,
    },
  });

  return card;
};

export const update: V.Update = ({ userId, ...data }) => {
  const card = DB.update({
    ...data,
    archived: false,
    activity: {
      date: new Date(),
      userId,
      action: data.activity.action,
    },
  });

  return card;
};

export const { getOne } = DB;

export const { findMany } = DB;

export const { deleteOne } = DB;
