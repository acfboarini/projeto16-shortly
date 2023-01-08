import { Router } from "express";
import { deleteUrl, getRanking, getUrlById, postUrl, redirectUserToUrl } from "../controllers/urlController.js";
import { authorization } from "../middlewares/authMiddleware.js";
import { validateUrl } from "../middlewares/urlMiddleware.js";

const urlRouter = Router();
urlRouter.post("/urls/shorten", validateUrl, authorization, postUrl);
urlRouter.get("/urls/:id", getUrlById);
urlRouter.get("/urls/open/:shortUrl", redirectUserToUrl);
urlRouter.delete("/urls/:id", authorization, deleteUrl);
urlRouter.get("/ranking", getRanking);

export default urlRouter;