import { Router } from "express";

import { userRoutes } from "./user_routes";

const router = Router();

router.use("/api", userRoutes);

export { router };
