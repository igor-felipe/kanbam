import { Router } from "express";
import { pipe } from "fp-ts/lib/function";
import * as V from "../validators/user_validator";
import * as UC from "../useCase/user_useCase";

const userRoutes = Router();

userRoutes.post("/user/register", async (req, res, next) => {
  try {
    res
      .status(201)
      .json(await pipe(req.body, V.createValidator.parse, UC.create));
  } catch (error) {
    next(error);
  }
});

userRoutes.get("/user/:id", async (req, res, next) => {
  try {
    res.json(
      await pipe({ id: req.params.id }, V.getOneValidator.parse, UC.getOne),
    );
  } catch (error) {
    next(error);
  }
});

userRoutes.get("/user", async (req, res, next) => {
  try {
    res.json(await pipe(req.query, V.findManyValidator.parse, UC.findMany));
  } catch (error) {
    next(error);
  }
});

userRoutes.put("/user", async (req, res, next) => {
  try {
    res.json(await pipe(req.body, V.updateValidator.parse, UC.update));
  } catch (error) {
    next(error);
  }
});

userRoutes.post("/user/login", async (req, res, next) => {
  try {
    res.json(await pipe(req.body, V.loginValidator.parse, UC.login));
  } catch (error) {
    next(error);
  }
});

export { userRoutes };
