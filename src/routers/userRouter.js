import { Router } from "express";
import { getUserWithUrls } from "../controllers/userController.js";
import { authorization } from "../middlewares/authMiddleware.js";

const userRouter = Router();
userRouter.get("/users/me", authorization, getUserWithUrls);

export default userRouter;