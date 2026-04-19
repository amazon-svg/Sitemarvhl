import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

const rootEl = document.getElementById("root")!;

// En prod après pré-rendu, #root contient déjà le HTML SSR → on hydrate.
// En dev (ou en prod sans pré-rendu), #root est vide → createRoot classique.
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, <App />);
} else {
  createRoot(rootEl).render(<App />);
}
