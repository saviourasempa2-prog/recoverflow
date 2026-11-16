import { json } from "@remix-run/node";

export async function loader() {
  return json({ status: "ok" }, 200);
}

export default function HealthRoute() {
  return null;
}
