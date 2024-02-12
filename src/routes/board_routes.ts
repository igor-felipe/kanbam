import { Router } from "express";
import { pipe } from "fp-ts/lib/function";
import * as V from "../validators/board_validator";
import * as UC from "../useCase/board_useCase";

const boardRoutes = Router();

boardRoutes.post("/board", async (req, res, next) => {
  try {
    res
      .status(201)
      .json(
        await pipe(
          { ...req.body, userId: req.auth.id },
          V.createValidator,
          UC.create,
        ),
      );
  } catch (error) {
    next(error);
  }
});

boardRoutes.get("/board/:id", async (req, res, next) => {
  try {
    res.json(await pipe({ id: req.params.id }, V.getOneValidator, UC.getOne));
  } catch (error) {
    next(error);
  }
});

boardRoutes.get("/board", async (req, res, next) => {
  try {
    res.json(await pipe(req.query, V.findManyValidator, UC.findMany));
  } catch (error) {
    next(error);
  }
});

boardRoutes.put("/board", async (req, res, next) => {
  try {
    res.json(await pipe(req.body, V.updateValidator, UC.update));
  } catch (error) {
    next(error);
  }
});

boardRoutes.delete("/board/:id", async (req, res, next) => {
  try {
    res.json(
      await pipe(
        { id: req.params.id, userId: req.auth.id },
        V.deleteOneValidator,
        UC.deleteOne,
      ),
    );
  } catch (error) {
    next(error);
  }
});

export { boardRoutes };
