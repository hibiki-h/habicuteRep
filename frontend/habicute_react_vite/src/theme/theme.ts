import { createSystem, defineConfig, defaultConfig } from "@chakra-ui/react";

const config = defineConfig({
  globalCss: {
    "html, body": {
      height: "100%",
      width: "100%",
      margin: 0,
      padding: 0,
      overflowX: "hidden",
      background: "url(/bgwallpaper.jpg)",
      backgroundAttachment: "fixed",
      backgroundSize: "500px 333px",
      backgroundRepeat: "repeat",
      fontFamily: "Jacques Francois",
      color: "blackAlpha.700",
    },
  },
});

export const customconfig = createSystem(config, defaultConfig);
