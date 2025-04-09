import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./i18n";
import { HomePage } from "./HomePage";
import "./index.scss";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#708a83",
      main: "#4d6d64",
      dark: "#354c46",
      contrastText: "#fff",
    },
    secondary: {
      light: "#cbde57",
      main: "#bed62e",
      dark: "#859520",
      contrastText: "#000",
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <HomePage />
    </ThemeProvider>
  </StrictMode>
);
