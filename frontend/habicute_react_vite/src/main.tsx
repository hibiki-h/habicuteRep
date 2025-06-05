import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "@/components/ui/provider";

import App from "./App.tsx";
import "destyle.css";
import { TodoProvider } from "./providers/ContentProvider.tsx";
import { AuthProvider } from "./providers/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <AuthProvider>
        <TodoProvider>
          <App />
        </TodoProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>
);
