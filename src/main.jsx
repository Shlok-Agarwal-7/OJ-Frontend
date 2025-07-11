import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { Toaster } from "sonner";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster richColors position="top-center" duration={1000} visibleToasts={2} />
      <App />
    </BrowserRouter>
  </StrictMode>
);
