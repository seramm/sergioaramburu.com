import { Image } from "@chakra-ui/react";
import Container from "components/container";
import ProtectedRoute from "components/protectedroute";
import Link from "next/link";

export default function Page() {
  return (
    <ProtectedRoute>
      <Container>
        <Link href="/images/architecture.png">
          <Image
            alt="Homelab infrastructure"
            src="/images/architecture.png"
            rounded="2xl"
          />
        </Link>
      </Container>
    </ProtectedRoute>
  );
}
