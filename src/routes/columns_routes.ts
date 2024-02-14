import { Router } from "express";
import { pipe } from "fp-ts/lib/function";
import * as V from "../validators/column_validator";
import * as UC from "../useCase/column_useCase";

const columnRoutes = Router();

columnRoutes.post("/column", async (req, res, next) => {
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

columnRoutes.get("/column/:id", async (req, res, next) => {
  try {
    res.json(await pipe({ id: req.params.id }, V.getOneValidator, UC.getOne));
  } catch (error) {
    next(error);
  }
});

columnRoutes.get("/column", async (req, res, next) => {
  try {
    res.json(await pipe(req.query, V.findManyValidator, UC.findMany));
  } catch (error) {
    next(error);
  }
});

columnRoutes.put("/column", async (req, res, next) => {
  try {
    res.json(await pipe(req.body, V.updateValidator, UC.update));
  } catch (error) {
    next(error);
  }
});

columnRoutes.delete("/column/:id", async (req, res, next) => {
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

export { columnRoutes };
