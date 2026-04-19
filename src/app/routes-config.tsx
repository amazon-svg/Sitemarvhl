import type { RouteObject } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./pages/Home";
import { Building } from "./pages/Building";
import { Lots } from "./pages/Lots";
import { LotDetail } from "./pages/LotDetail";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";

// Définition pure des routes, partagée entre le client (createBrowserRouter)
// et le pré-rendu serveur (createStaticHandler / createStaticRouter).
export const routes: RouteObject[] = [
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "le-batiment", Component: Building },
      { path: "nos-lots", Component: Lots },
      { path: "lot/:slug", Component: LotDetail },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
];
