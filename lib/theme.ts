import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system =  createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        gray: {
          50: { value: "#070709" },
          100: { value: "#121417" },
          200: { value: "#1d2026" },
          300: { value: "#282c34" },
          400: { value: "#333842" },
          500: { value: "#3e4451" },
          600: { value: "#49515f" },
          700: { value: "#545d6d" },
          800: { value: "#5f6a7c" },
          900: { value: "#6a768a" },
        },
      },
    },
  },
  globalCss: {
    "html, body": {
      bg: "gray.300",
      color: "#bbc2cf",
    },
  },
});
