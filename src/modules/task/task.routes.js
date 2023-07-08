import express from "express"
import * as taskController from "./task.controller.js"
// import { validation } from './../../../utlits/middlware/valdiation.js';
import { createSchema } from "./task.validation.js";

import { allowTo, protectedRoutes } from './../../../auth/auth.controller.js';
import { validation } from "../../../utlits/middlware/valdiation.js";
export const taskRouter = express.Router();






taskRouter.route("/")
.get(protectedRoutes,taskController.getAllTask)
.post(validation(createSchema),protectedRoutes,taskController.createTask)

taskRouter.route("/:id")
.get(protectedRoutes,taskController.getAllTask)
.put(protectedRoutes,taskController.updateTask)
.delete(protectedRoutes,taskController.deleteTask)


