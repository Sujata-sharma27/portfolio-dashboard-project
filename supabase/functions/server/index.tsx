import { Hono } from 'hono';
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { serve } from "@hono/node-server";  
import * as kv from "./kv_store.tsx"; 

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-f6a9c027/health", (c) => {
  return c.json({ status: "ok" });
});

serve({
  fetch: app.fetch,
  port: 3000,
});