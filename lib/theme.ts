import { extendTheme } from "@chakra-ui/react";

const colors = {
  gray: {
    50: "#070709",
    100: "#121417",
    200: "#1d2026",
    300: "#282c34",
    400: "#333842",
    500: "#3e4451",
    600: "#49515f",
    700: "#545d6d",
    800: "#5f6a7c",
    900: "#6a768a",
  }
}
const theme = {
  colors,
  styles: {
    global: {
      "html, body": {
        bg: "gray.300",
        color: "#bbc2cf",
      },
    },
  },
  components: {
    Heading: {
      variants: {
        section: {
          textDecoration: "underline",
          textDecorationColor: "#8e9aaf",
          textDecorationThickness: 5,
        },
      },
    },
  },
};

export default extendTheme(theme);
