import { exec } from "child_process";
import { Response, Request, Router } from "express";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/lib/TaskEither";

const devRoutes = Router();

const execCommand = (command = ""): Promise<string[]> =>
  new Promise((resolve, reject) => {
    exec(command, (error, stdout) =>
      error ? reject(error) : resolve([command, ...stdout.trim().split("\n")]),
    );
  });

devRoutes.post("/dev/reset-db", async (req: Request, res: Response) =>
  pipe(
    TE.tryCatch(
      () => execCommand("yarn prisma db push --force-reset"),
      (error) => new Error(`Error: ${(error as Error).message}`),
    ),
    TE.map((result) => res.json(result)),
  )(),
);

export { devRoutes };
