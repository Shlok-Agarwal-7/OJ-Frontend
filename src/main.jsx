import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { Toaster } from "sonner";
import { UserProvider } from "./context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Toaster
          richColors
          position="top-center"
          duration={1000}
          visibleToasts={2}
        />
        <App />
      </BrowserRouter>
    </UserProvider>
  </StrictMode>
);
