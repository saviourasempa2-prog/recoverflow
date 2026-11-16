import "@shopify/shopify-app-remix/adapters/node";
import { ApiVersion, shopifyApp } from "@shopify/shopify-app-remix/server";
import { MemorySessionStorage } from "@shopify/shopify-app-session-storage-memory";
import { PostgreSQLSessionStorage } from "@shopify/shopify-app-session-storage-postgresql";

const databaseUrl = process.env.DATABASE_URL?.trim();

let sessionStorage;
if (databaseUrl) {
  try {
    sessionStorage = new PostgreSQLSessionStorage(databaseUrl);
  } catch (error) {
    console.error("Could not initialize PostgreSQL session storage; using memory storage.", error);
    sessionStorage = new MemorySessionStorage();
  }
} else {
  console.warn("DATABASE_URL is not set; using in-memory Shopify sessions.");
  sessionStorage = new MemorySessionStorage();
}

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY ?? "",
  apiSecretKey: process.env.SHOPIFY_API_SECRET ?? "",
  apiVersion: ApiVersion.July25,
  scopes: process.env.SCOPES?.split(",").map((scope) => scope.trim()).filter(Boolean) ?? [],
  appUrl: process.env.SHOPIFY_APP_URL ?? process.env.APP_URL ?? "",
  authPathPrefix: "/auth",
  sessionStorage,
});

export default shopify;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorageInstance = sessionStorage;
