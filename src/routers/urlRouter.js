import { Router } from "express";
import { postUrl } from "../controllers/urlController.js";
import { authorization} from "../middlewares/authMiddleware.js";

const urlRouter = Router();
urlRouter.post("/urls/shorten", authorization, postUrl);

export default urlRouter;