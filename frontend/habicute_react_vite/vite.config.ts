import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          reactVendor: [
            "react",
            "react-dom",
            "react-icons",
            "react-hook-form",
            "react-router",
          ],
          fullCalendar: [
            "@fullcalendar/core",
            "@fullcalendar/daygrid",
            "@fullcalendar/interaction",
            "@fullcalendar/list",
            "@fullcalendar/react",
            "@fullcalendar/timegrid",
          ],
          uiLibs: ["@chakra-ui/react", "@emotion/react"],
          utilsLibs: ["axios", "date-fns"],
        },
      },
    },
  },
});
