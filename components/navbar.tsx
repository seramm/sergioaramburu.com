import { Box, Flex, HStack, Spacer, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { ServerRackIcon } from "./icons";

export default function NavBar() {
  return (
    <Flex
      as="header"
      paddingY="6"
      maxWidth="3xl"
      marginX="auto"
      paddingX="6"
      align="center"
    >
      <Box
        borderColor="whiteAlpha.800"
        borderWidth={2}
        borderStyle="solid"
        w="75px"
        h="75px"
        display="inline-block"
        borderRadius="full"
        overflow="hidden"
      >
        <Image
          src="/images/profile.jpg"
          width="100"
          height="100"
          alt="Profile"
        />
      </Box>
      <Spacer />
      <Box>
        <HStack as="nav" display={{ base: "none", md: "flex" }}>
          <HStack
            as={Link}
            href="architecture/"
            rounded="lg"
            _hover={{ color: "gray.900" }}
          >
            <ServerRackIcon />
            <Text fontFamily="heading">Cloud</Text>
          </HStack>
        </HStack>
      </Box>
    </Flex>
  );
}
