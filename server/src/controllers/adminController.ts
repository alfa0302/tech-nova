import { NextFunction, Request, Response } from "express";
import { getAuth } from "@clerk/express";
import { getLocalUser } from "../lib/users";
import { isAdmin } from "../lib/roles";
import { getEnv } from "../lib/env";
import ImageKit from "@imagekit/nodejs";
import { db } from "../db";
import { orderItems, products } from "../db/schema";
import z from "zod";
import { desc, eq, sql } from "drizzle-orm";
import { deleteImageKitAsset } from "../lib/imageKit";

const env = getEnv();

const productData = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  category: z.string().min(1).default("General"),
  description: z.string().default(""),
  priceCents: z.number().int().positive(),
  currency: z.string().min(1).default("aed"),
  imageUrl: z
    .union([z.string().url(), z.literal("")])
    .optional()
    .nullable(),
  imageKitFileId: z
    .union([z.string().min(1), z.literal(""), z.null()])
    .optional(),
  active: z.boolean().default(true),
});

function buildProductUpdateData(body: Partial<typeof products.$inferInsert>) {
  const data: Partial<typeof products.$inferInsert> = {};
  if (body.slug !== undefined) data.slug = body.slug;
  if (body.name !== undefined) data.name = body.name;
  if (body.category !== undefined) data.category = body.category;
  if (body.description !== undefined) data.description = body.description;
  if (body.priceCents !== undefined) data.priceCents = body.priceCents;
  if (body.currency !== undefined) data.currency = body.currency;
  if (body.imageUrl !== undefined) {
    data.imageUrl = body.imageUrl === "" ? null : body.imageUrl;
  }
  if (body.imageKitFileId !== undefined) {
    data.imageKitFileId =
      body.imageKitFileId === "" ? null : body.imageKitFileId;
  }
  if (body.active !== undefined) data.active = body.active;
  return data;
}

export async function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId, isAuthenticated } = getAuth(req);
    if (!isAuthenticated || !userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await getLocalUser(userId);
    if (!isAdmin(user.role)) {
      return res.status(403).json({ error: "Admin only" });
    }
    next();
  } catch (error) {
    next(error);
  }
}

export function getImageKitAuth(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const client = new ImageKit({
      privateKey: env.IMAGEKIT_PRIVATE_KEY,
    });
    const auth = client.helper.getAuthenticationParameters();

    res.json({
      ...auth,
      publicKey: env.IMAGEKIT_PUBLIC_KEY,
      urlEndpoint: env.IMAGEKIT_URL_ENDPOINT,
    });
  } catch (e) {
    next(e);
  }
}

export async function createAdminProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const prod = productData.safeParse(req.body);
    if (!prod.success) {
      return res
        .status(400)
        .json({ error: "Invalid body", details: prod.error.flatten() });
    }
    const { imageUrl, imageKitFileId, ...rest } = prod.data;
    const [product] = await db
      .insert(products)
      .values({
        ...rest,
        imageKitFileId: imageKitFileId || null,
        imageUrl: imageUrl || null,
      })
      .returning();
    res.status(201).json({ product: product });
  } catch (error) {
    next(error);
  }
}

export async function listAdminProducts(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const rows = await db
      .select()
      .from(products)
      .orderBy(desc(products.createdAt));
    res.json({ products: rows });
  } catch (e) {
    next(e);
  }
}

const productPatch = productData.partial();
export async function updateAdminProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const parsed = productPatch.safeParse(req.body);
  if (!parsed.success) {
    res
      .status(400)
      .json({ error: "Invalid body", details: parsed.error.flatten() });
    return;
  }
  if (Object.keys(parsed.data).length === 0) {
    res.status(400).json({ error: "No fields to update" });
    return;
  }

  const data = buildProductUpdateData(parsed?.data);
  const [row] = await db
    .update(products)
    .set(data)
    .where(eq(products.id, req.params.id as string))
    .returning();

  if (!row) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  res.json({ product: row });

  try {
  } catch (error) {
    next(error);
  }
}

export async function deleteAdminProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = req.params.id as string;

    const [existing] = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);
    if (!existing) {
      return res.status(404).json({ error: "Not found" });
    }

    // don't delete product if present in an order
    const [rowCount] = await db
      .select({ c: sql<number>`count()` })
      .from(orderItems)
      .where(eq(orderItems.productId, id));

    if (Number(rowCount?.c ?? 0) > 0) {
      return res.status(409).json({
        error:
          "This product is on one or more orders and cannot be deleted. Deactivate it instead.",
      });
    }

    await deleteImageKitAsset(env, existing.imageKitFileId);
    await db.delete(products).where(eq(products.id, id));
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
}
