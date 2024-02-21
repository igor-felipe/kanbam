import { Router } from "express";
import { pipe } from "fp-ts/lib/function";
import * as V from "../validators/card_validator";
import * as UC from "../useCase/card_useCase";

const cardRoutes = Router();

cardRoutes.post("/card", async (req, res, next) => {
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

cardRoutes.get("/card/:id", async (req, res, next) => {
  try {
    res.json(
      await pipe({ id: Number(req.params.id) }, V.getOneValidator, UC.getOne),
    );
  } catch (error) {
    next(error);
  }
});

cardRoutes.get("/card", async (req, res, next) => {
  try {
    res.json(await pipe(req.query, V.findManyValidator, UC.findMany));
  } catch (error) {
    next(error);
  }
});

cardRoutes.put("/card", async (req, res, next) => {
  try {
    res.json(
      await pipe(
        { ...req.body, userId: req.auth.id },
        V.updateValidator,
        UC.update,
      ),
    );
  } catch (error) {
    next(error);
  }
});

cardRoutes.delete("/card/:id", async (req, res, next) => {
  try {
    res.json(
      await pipe(
        { id: Number(req.params.id), userId: req.auth.id },
        V.deleteOneValidator,
        UC.deleteOne,
      ),
    );
  } catch (error) {
    next(error);
  }
});

export { cardRoutes };
