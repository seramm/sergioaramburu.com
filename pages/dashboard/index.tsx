import { Box } from "@chakra-ui/react";
import Container from "components/container";
import { PasskeyManager } from "components/passkeymanager";
import { ProtectedAdminRoute } from "components/protectedroute";

export default function Page() {
  return (
    <ProtectedAdminRoute>
      <Container>
        <Box
          display={{ md: "flex" }}
          py={9}
          justifyContent="center"
          alignItems="center"
        >
          <PasskeyManager />
        </Box>
      </Container>
    </ProtectedAdminRoute>
  );
}
