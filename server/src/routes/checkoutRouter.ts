import { Router } from "express";
import { createCheckout } from "../controllers/checoutController";
const router = Router();

router.post("/", createCheckout);

export default router;
