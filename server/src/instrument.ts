import * as Sentry from "@sentry/node";

export const dsn = process.env.SENTRY_DSN;
if (dsn) {
  Sentry.init({
    dsn: dsn,
    // Add Tracing by setting tracesSampleRate
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}
