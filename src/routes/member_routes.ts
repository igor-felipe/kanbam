import { Router } from "express";
import { pipe } from "fp-ts/lib/function";
import * as V from "../validators/member_validator";
import * as UC from "../useCase/member_useCase";

const memberRoutes = Router();

memberRoutes.post("/member", async (req, res, next) => {
  try {
    res
      .status(201)
      .json(
        await pipe(
          { ...req.body, auth: req.auth },
          V.createValidator,
          UC.create,
        ),
      );
  } catch (error) {
    next(error);
  }
});

memberRoutes.get("/member/:workspaceId/:userId", async (req, res, next) => {
  try {
    res.json(
      await pipe(
        { workspaceId: req.params.workspaceId, userId: req.params.userId },
        V.getOneValidator,
        UC.getOne,
      ),
    );
  } catch (error) {
    next(error);
  }
});

memberRoutes.get("/member", async (req, res, next) => {
  try {
    res.json(await pipe(req.query as any, V.findManyValidator, UC.findMany));
  } catch (error) {
    next(error);
  }
});

memberRoutes.put("/member", async (req, res, next) => {
  try {
    res.json(
      await pipe({ ...req.body, auth: req.auth }, V.updateValidator, UC.update),
    );
  } catch (error) {
    next(error);
  }
});

memberRoutes.delete("/member/:workspaceId/:userId", async (req, res, next) => {
  try {
    res.json(
      await pipe(
        {
          workspaceId: req.params.workspaceId,
          userId: req.params.userId,
          auth: req.auth,
        },
        V.deleteOneValidator,
        UC.deleteOne,
      ),
    );
  } catch (error) {
    next(error);
  }
});

export { memberRoutes };
