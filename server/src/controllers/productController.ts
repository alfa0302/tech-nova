import type { NextFunction, Request, Response } from "express";
import { db } from "../db/index";
import { products } from "../db/schema";
import { and, desc, eq } from "drizzle-orm";

export async function listProducts(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const cat =
      typeof req.query.category === "string" ? req.query.category.trim() : "";
    const activeOnly = eq(products.active, true);
    const whereClause = cat
      ? and(activeOnly, eq(products.category, cat))
      : activeOnly;
    const row = await db
      .select()
      .from(products)
      .where(whereClause)
      .orderBy(desc(products.createdAt));

    res.status(200).json({ products: row });
  } catch (error) {
    next(error);
  }
}
export async function getCategories(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const rows = await db
      .selectDistinct({ category: products.category })
      .from(products)
      .where(eq(products.active, true));
    const categories = rows
      .map((r) => r.category)
      .sort((a, b) => a.localeCompare(b));
    return res.status(200).json({ categories });
  } catch (error) {
    next(error);
  }
}
export async function getProductBySlug(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const [row] = await db
      .select()
      .from(products)
      .where(eq(products.slug, req.params.slug as string))
      .limit(1);
    if (!row || !row.active)
      return res.status(404).json({ error: "Not found" });
    return res.status(200).json({ product: row });
  } catch (error) {
    next(error);
  }
}
