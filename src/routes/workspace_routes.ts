import { Router } from "express";
import { pipe } from "fp-ts/lib/function";
import * as V from "../validators/workspace_validator";
import * as UC from "../useCase/workspace_useCase";

const workspaceRoutes = Router();

workspaceRoutes.post("/workspace", async (req, res, next) => {
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

workspaceRoutes.get("/workspace/:id", async (req, res, next) => {
  try {
    res.json(await pipe({ id: req.params.id }, V.getOneValidator, UC.getOne));
  } catch (error) {
    next(error);
  }
});

workspaceRoutes.get("/workspace", async (req, res, next) => {
  try {
    res.json(await pipe(req.query, V.findManyValidator, UC.findMany));
  } catch (error) {
    next(error);
  }
});

workspaceRoutes.put("/workspace", async (req, res, next) => {
  try {
    res.json(await pipe(req.body, V.updateValidator, UC.update));
  } catch (error) {
    next(error);
  }
});

workspaceRoutes.delete("/workspace/:id", async (req, res, next) => {
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

export { workspaceRoutes };
