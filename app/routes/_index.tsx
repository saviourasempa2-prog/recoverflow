import { Page } from "@shopify/polaris";
import { authenticate } from "~/shopify.server";

export async function loader({ request }: { request: Request }) {
  await authenticate.admin(request);
  return null;
}

export default function IndexRoute() {
  return <Page title="RecoverFlow Dashboard" />;
}
