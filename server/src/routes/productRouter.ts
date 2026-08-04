import { Router } from "express";
const router = Router();
import {
  listProducts,
  getCategories,
  getProductBySlug,
} from "../controllers/productController";

router.get("/", listProducts);
router.get("/categories", getCategories);
router.get("/:slug", getProductBySlug);

export default router;
