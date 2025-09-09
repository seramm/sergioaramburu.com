"use client";

import { system } from "lib/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { AuthProvider } from "context/session";

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <AuthProvider>
        <ColorModeProvider {...props} />
      </AuthProvider>
    </ChakraProvider>
  );
}
