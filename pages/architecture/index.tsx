import { Box, Image } from "@chakra-ui/react";
import Footer from "components/footer";
import NavBar from "components/navbar";

export default function Page() {
  return (
    <Box>
      <NavBar />
      <Box marginX="auto" px={100}>
        <Box display={{ md: "flex" }} py={9}>
          <Image alt="Homelab infrastructure"src="/images/architecture.png" rounded="2xl" />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
