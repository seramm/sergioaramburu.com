import { Box, Image } from "@chakra-ui/react";
import Footer from "components/footer";
import NavBar from "components/navbar";
import ProtectedRoute from "components/protectedroute";
import Link from "next/link";

export default function Page() {
  return (
    <ProtectedRoute>
      <Box>
        <NavBar />
        <Box marginX="auto" px={100}>
          <Box display={{ md: "flex" }} py={9}>
            <Link href="/images/architecture.png">
              <Image
                alt="Homelab infrastructure"
                src="/images/architecture.png"
                rounded="2xl"
              />
            </Link>
          </Box>
        </Box>
        <Footer />
      </Box>
    </ProtectedRoute>
  );
}
