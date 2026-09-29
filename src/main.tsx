import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { legacyTarget } from "./lib/legacyAnchors";
import "./index.css";

// Old Astro-build anchors (e.g. "/#projects") are redirected once, before the router starts.
const target = legacyTarget(window.location);
if (target) window.history.replaceState(null, "", target);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
