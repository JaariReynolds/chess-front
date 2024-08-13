import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ChessContextProvider from "./contexts/chessContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChessContextProvider>
      <App />
    </ChessContextProvider>
  </StrictMode>
);
