import { VStack } from "@chakra-ui/react";
import { PasskeyManager } from "components/passkeymanager";
import { GalleryManager } from "components/gallerymanager";
import Container from "components/container";

export default function Page() {
  return (
    <Container size="6xl">
      <VStack
        display={{ md: "flex" }}
        py={9}
        justifyContent="center"
        alignItems="center"
      >
        <PasskeyManager />
        <GalleryManager />
      </VStack>
    </Container>
  );
}
