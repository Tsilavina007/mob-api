import * as express from "express";

import { GoalController } from "@/controllers";
import { paginationHandler } from "@/middlewares";

export const goalRouter = express.Router({ mergeParams: true });

goalRouter.post("/", GoalController.create);
goalRouter.put("/:goalId", GoalController.update);
goalRouter.get("/:goalId", GoalController.getOne);
goalRouter.post("/:goalId/archive", GoalController.archiveOne);
goalRouter.post("/:goalId/unarchive", GoalController.unarchiveOne);

export const goalListRouter = express.Router({ mergeParams: true });
goalListRouter.get("/", paginationHandler, GoalController.getAll);
goalListRouter.get("/archived", paginationHandler, GoalController.getArchived);
