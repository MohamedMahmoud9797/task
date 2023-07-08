import express from "express"
import * as userController from "./user.controller.js"
export const userRouter = express.Router();

userRouter.route("/")
.post(userController.createUser)
userRouter.patch("/changePassword/:id", userController.changePassword)
