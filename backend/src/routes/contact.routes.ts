import { Router } from "express";
import { ContactController } from "../controllers/ContactController";

const router = Router();

router.post("/", ContactController.send);

export default router;
