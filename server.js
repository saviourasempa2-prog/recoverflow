import express from "express";
import { createRequestHandler } from "@remix-run/express";
import * as build from "./build/index.js";

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(express.static("public", { index: false }));

app.get("/health", (_req, res) => {
  res.status(200).type("text/plain").send("ok");
});

app.use(
  createRequestHandler({
    build,
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
  })
);

app.listen(port, () => {
  console.log(`RecoverFlow Remix app listening on http://localhost:${port}`);
});
