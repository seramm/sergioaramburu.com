import { Box } from "@chakra-ui/react";
import Container from "components/container";
import Login from "components/login";

export default function Page() {
  return (
    <Container>
      <Box
        display={{ md: "flex" }}
        py={9}
        justifyContent="center"
        alignItems="center"
      >
        <Login />
      </Box>
    </Container>
  );
}
