import { Box } from "@chakra-ui/react";
import Container from "components/container";
import Footer from "components/footer";
import Login from "components/login";
import NavBar from "components/navbar";

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
