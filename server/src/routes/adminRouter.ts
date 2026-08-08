import express from "express";
import { requireAdmin } from "../controllers/adminController";
const router = express.Router();

router.use(requireAdmin);

export default router;
