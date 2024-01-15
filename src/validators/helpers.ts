import { z } from "zod";

type Validator<T> = z.ZodSchema<T>;

export const validatorAdapter =
  <T>(validator: Validator<T>) =>
  (data: T) =>
    validator.parse(data);
