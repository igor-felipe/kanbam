import { Router } from "express";

import { userRoutes } from "./user_routes";
import { workspaceRoutes } from "./workspace_routes";
import { memberRoutes } from "./member_routes";

const router = Router();

router.use("/api", userRoutes, workspaceRoutes, memberRoutes);

export { router };
