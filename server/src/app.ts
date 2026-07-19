import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import { clerkWebhookHandler } from "./webhooks/clerk";
import { getEnv } from "./lib/env";
import path from "path";
import fs from "fs";

const env = getEnv();
const app = express();

// health endpoint for github actions cron job
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK" });
});

// defined before json parsing as raw data is needed
const rawJSON = express.raw({ type: "application/json", limit: "1mb" });
app.post("/webhook/clerk", rawJSON, (req, res) => {
  void clerkWebhookHandler(req, res);
});

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

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

app.listen(process.env.PORT || env.PORT, () => {
  console.log("App listening on port", process.env.PORT || env.PORT);
});
