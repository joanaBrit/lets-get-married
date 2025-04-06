import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./i18n";
import { HomePage } from "./HomePage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HomePage />
  </StrictMode>
);
