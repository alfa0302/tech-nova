import express, { NextFunction, Response, Request } from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import { clerkWebhookHandler } from "./webhooks/clerk";
import { polarWebhookHandler } from "./webhooks/polar";
import { getEnv } from "./lib/env";
import path from "path";
import fs from "fs";
import * as Sentry from "@sentry/node";
// routers
import productRouter from "./routes/productRouter";
import userRouter from "./routes/userRouter";
import checkoutRouter from "./routes/checkoutRouter";
import { sentryClerkUserMiddleware } from "./middleware/sentryClerkUser";

const env = getEnv();
const app = express();

// defined before json parsing as raw data is needed
const rawJSON = express.raw({ type: "application/json", limit: "1mb" });
app.post("/webhook/clerk", rawJSON, (req, res) => {
  void clerkWebhookHandler(req, res);
});
app.post("/webhook/polar", rawJSON, (req, res) => {
  void polarWebhookHandler(req, res);
});

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());
app.use(sentryClerkUserMiddleware);

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/checkout", checkoutRouter);

const publicDir = path.join(process.cwd(), "../client/dist");
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
  app.get("/{*any}", (req, res, next) => {
    if (req.method !== "GET" && req.method !== "HEAD") {
      next();
      return;
    }
    if (req.path.startsWith("/api") || req.path.startsWith("/webhooks")) {
      next();
      return;
    }
    res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
  });
}

// attach sentry to res object
Sentry.setupExpressErrorHandler(app);

app.use((_err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const sentryId = res as express.Response & { sentry?: string };
  res.status(500).json({
    error: "Internal Server Error",
    ...(sentryId !== undefined && { sentryId }),
  });
});

app.listen(process.env.PORT || env.PORT, () => {
  console.log("App listening on port", process.env.PORT || env.PORT);
});
