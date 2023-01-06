import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/authController.js";
import { authorization, validateSignInSchema, validateSignUpSchema } from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSignUpSchema, signUp);
authRouter.post("/sign-in", validateSignInSchema, signIn);
authRouter.post("/sign-out", authorization, signOut);

export default authRouter;