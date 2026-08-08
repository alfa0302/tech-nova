import { Request, Response } from "express";
import {
  validateEvent,
  WebhookVerificationError,
} from "@polar-sh/sdk/webhooks";
import { getEnv } from "../lib/env";
import { db } from "../db";
import { checkoutSessions, orders, orderItems } from "../db/schema";
import { eq } from "drizzle-orm";

const env = getEnv();

export const polarWebhookHandler = async (req: Request, res: Response) => {
  try {
    const event = validateEvent(
      req.body,
      req.headers as Record<string, string>,
      env.POLAR_WEBHOOK_SECRET ?? "",
    );
    if (event.type === "order.paid" && event.data) {
      const data = event.data;
      const polarOrderId = typeof data.id === "string" ? data.id : undefined;
      const polarCheckoutId =
        typeof data.checkoutId === "string" ? data.checkoutId : undefined;

      if (await isAlreadyPaid(polarCheckoutId, polarOrderId)) {
        return res.json({ ok: true, duplicate: true });
      }

      const sessionId = checkoutSessionIdFromMetadata(data);

      if (sessionId) {
        const ok = await fulfillCheckoutSession(
          sessionId,
          polarOrderId,
          polarCheckoutId,
        );

        if (ok) {
          res.json({ ok: true });
          return;
        }

        if (await isAlreadyPaid(polarOrderId, polarCheckoutId)) {
          res.json({ ok: true, duplicate: true });
          return;
        }

        console.error("Polar order.paid: could not fulfill checkout session", {
          sessionId,
          polarCheckoutId,
        });

        res.status(500).json({ error: "Checkout fulfillment failed" });
        return;
      }
    }
    res.json({ ok: true });
  } catch (error) {
    if (error instanceof WebhookVerificationError) {
      res.status(403).send("");
    }
    throw error;
  }
};

async function isAlreadyPaid(polarCheckoutId?: string, polarOrderId?: string) {
  if (polarOrderId) {
    const [row] = await db
      .select()
      .from(orders)
      .where(eq(orders.polarOrderId, polarOrderId))
      .limit(1);
    if (row?.status === "paid") return true;
  }
  if (polarCheckoutId) {
    const [row] = await db
      .select()
      .from(orders)
      .where(eq(orders.polarCheckoutId, polarCheckoutId))
      .limit(1);
    if (row?.status === "paid") return true;
  }
  return false;
}

function checkoutSessionIdFromMetadata(order: Record<string, unknown>) {
  const metadata = order.metadata;
  if (!metadata || typeof metadata !== "object") return undefined;
  const sessionId = (metadata as Record<string, unknown>).checkout_session_id;
  return typeof sessionId === "string" ? sessionId : undefined;
}

async function fulfillCheckoutSession(
  sessionId: string,
  polarOrderId: string | undefined,
  checkoutId: string | undefined,
) {
  return await db.transaction(async (tx) => {
    const [session] = await tx
      .select()
      .from(checkoutSessions)
      .where(eq(checkoutSessions.id, sessionId))
      .for("update");

    if (!session) return false;

    const [order] = await tx
      .insert(orders)
      .values({
        userId: session.userId,
        status: "paid",
        totalCents: session.totalCents,
        polarCheckoutId: checkoutId ?? session.polarCheckoutId ?? null,
        ...(polarOrderId ? { polarOrderId } : {}),
      })
      .returning();

    if (session.lines.length) {
      await tx.insert(orderItems).values(
        session.lines.map((line) => ({
          orderId: order.id,
          productId: line.productId,
          quantity: line.quantity,
          unitPriceCents: line.unitPriceCents,
        })),
      );
    }

    await tx.delete(checkoutSessions).where(eq(checkoutSessions.id, sessionId));

    return true;
  });
}
