import { Request, Response, NextFunction } from "express";
import { getEnv } from "../lib/env";
import { getAuth } from "@clerk/express";
import { getLocalUser } from "../lib/users";
import z from "zod";
import { db } from "../db";
import { CheckoutSessionLine, checkoutSessions, products } from "../db/schema";
import { inArray, and, eq } from "drizzle-orm";
import { polarCreateCheckout } from "../lib/polar";

const env = getEnv();

const cartSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().uuid(),
      quantity: z.number().int().positive(),
    }),
  ),
});

export async function createCheckout(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const auth = getAuth(req);
    if (!auth.isAuthenticated) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await getLocalUser(auth.userId);
    if (!user) {
      return res.status(401).json({ error: "User not synced" });
    }

    if (!env.POLAR_ACCESS_TOKEN) {
      return res.status(400).json({ error: "Polar not configured" });
    }

    const data = cartSchema.safeParse(req.body);
    if (!data.success) {
      return res
        .status(400)
        .json({ error: "Invalid cart", details: data.error });
    }

    const prodIds = data.data.items.map((item) => item.productId);
    const prods = await db
      .select()
      .from(products)
      .where(and(inArray(products.id, prodIds), eq(products.active, true)));

    if (prods.length !== prodIds.length) {
      return res
        .status(400)
        .json({ error: "One or more products are invalid" });
    }

    const prodPrice = new Map(prods.map((p) => [p.id, p.priceCents]));
    let totalCents = 0;
    const lines: CheckoutSessionLine[] = [];

    for (const line of data.data.items) {
      const p = prodPrice.get(line.productId)!;
      totalCents += p * line.quantity;
      lines.push({
        productId: line.productId,
        quantity: line.quantity,
        unitPriceCents: p,
      });
    }
    if (totalCents < 10) {
      return res.status(400).json({
        error:
          "Total below Polar minimum (e.g. USD requires at least 10 cents)",
      });
    }

    const [session] = await db
      .insert(checkoutSessions)
      .values({
        userId: user.id,
        lines,
        totalCents,
        currency: "aed",
      })
      .returning();

    const successUrl = `${env.FRONTEND_URL}/checkout/return?checkout_id={CHECKOUT_ID}`;
    const returnUrl = `${env.FRONTEND_URL}/cart`;

    const checkout = await polarCreateCheckout(env, {
      products: [env.POLAR_CHECKOUT_PRODUCT_ID],
      prices: {
        [env.POLAR_CHECKOUT_PRODUCT_ID]: [
          {
            amount_type: "fixed",
            price_currency: "aed",
            price_amount: totalCents,
          },
        ],
      },
      success_url: successUrl,
      return_url: returnUrl,
      external_customer_id: user.id,
      metadata: { checkout_session_id: session.id },
    });

    await db
      .update(checkoutSessions)
      .set({ polarCheckoutId: checkout.id })
      .where(eq(checkoutSessions.id, session.id));

    res.json({ checkoutUrl: checkout.url });
  } catch (error) {
    next(error);
  }
}
