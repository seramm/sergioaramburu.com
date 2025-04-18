import { Box } from "@chakra-ui/react";
import Footer from "components/footer";
import Login from "components/login";
import NavBar from "components/navbar";

export default function Page() {
  return (
    <Box>
      <NavBar />
      <Box maxWidth="3xl" marginX="auto" paddingX="6">
        <Box
          display={{ md: "flex" }}
          py={9}
          justifyContent="center"
          alignItems="center"
        >
          <Login />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
