import { Box } from "@chakra-ui/react";
import Footer from "components/footer";
import NavBar from "components/navbar";
import React from "react";

export default function Container({
  children,
  size = "4xl",
}: {
  children: React.ReactNode;
  size?: string | number;
}) {
  return (
    <Box width={size} marginX="auto" paddingX="6">
      <NavBar />
      <Box as="main" id="content" position="relative" zIndex={1} pb={6}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
