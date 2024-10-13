import { Box, Image } from "@chakra-ui/react";
import Container from "components/container";
import Link from "next/link";

export default function Page() {
  return (
    <Container>
      <Box display={{ md: "flex" }} py={9}>
        <Link href="/images/architecture.png">
          <Image
            alt="Homelab infrastructure"
            src="/images/architecture.png"
            rounded="2xl"
          />
        </Link>
      </Box>
    </Container>
  );
}
