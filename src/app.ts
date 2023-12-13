import express, { Application } from "express";
import morgan from "morgan";
import helmet from "helmet";

import errorHandler from "./exceptions/errorHandler";

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());

app.use(errorHandler);

export default app;
