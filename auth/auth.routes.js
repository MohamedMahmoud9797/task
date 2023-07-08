import express from "express"
import * as authController from "./auth.controller.js"
import { validation } from "../utlits/middlware/valdiation.js";
import { signInSchema, signUpSchema } from "../src/modules/user/user.validation.js";

 const authRouter = express.Router();


 authRouter.post("/signUp", validation(signUpSchema),authController.signUp)
 authRouter.post("/signIn", validation(signInSchema),authController.signIn)
 authRouter.post("/signOut/:id",authController.signOut)



export default authRouter


