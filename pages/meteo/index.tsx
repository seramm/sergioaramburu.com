import { Box, Flex } from "@chakra-ui/react";
import Container from "components/container";
import ProtectedRoute from "components/protectedroute";
import BasicPlot from "components/plot";

export default function Page() {
  return (
    <Container>
      <Box marginX="auto" px={100}>
        <Box display={{ md: "flex" }} py={9}>
          <BasicPlot />
        </Box>
      </Box>
    </Container>
  );
}
