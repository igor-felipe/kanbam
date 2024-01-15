import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { router } from "./routes/routes";
import errorHandler from "./exceptions/errorHandler";

import { configuration } from "./config/jwt-configuration";
import { Auth } from "./validators/user_validator";

declare global {
  namespace Express {
    interface Request {
      auth: Auth;
    }
  }
}

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(
  configuration.unless({
    path: ["/api/user/login", "/api/user/register"],
  }),
);
app.use(router);
app.use(errorHandler);

export { app };
