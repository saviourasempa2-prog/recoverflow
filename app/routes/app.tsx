import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Page } from "@shopify/polaris";
import { authenticate } from "~/shopify.server";

export async function loader({ request }: { request: Request }) {
  await authenticate.admin(request);
  return json({ ok: true, route: "app" });
}

export default function AppRoute() {
  const data = useLoaderData();

  return (
    <Page title="RecoverFlow Dashboard">
      <p>{data.ok ? "Authenticated" : "Not authenticated"}</p>
    </Page>
  );
}
