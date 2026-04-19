import { renderToString } from "react-dom/server";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { routes } from "./app/routes-config";

export interface RenderResult {
  html: string;
  helmet: HelmetServerState;
}

export async function render(url: string): Promise<RenderResult> {
  const handler = createStaticHandler(routes);
  const context = await handler.query(new Request(`http://localhost${url}`));

  if (context instanceof Response) {
    throw new Error(
      `handler.query returned a Response (probable redirect) for ${url}`,
    );
  }

  const router = createStaticRouter(handler.dataRoutes, context);
  const helmetContext: { helmet?: HelmetServerState } = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouterProvider router={router} context={context} />
    </HelmetProvider>,
  );

  return { html, helmet: helmetContext.helmet! };
}
