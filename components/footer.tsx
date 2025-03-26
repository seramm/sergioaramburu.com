import { Box, Heading, HStack } from "@chakra-ui/react";
import LinkItem from "./link-item";
import siteConfig from "data";
import { GitHubIcon, LinkedInIcon } from "./icons";

export default function Footer() {
  return (
    <Box as="footer" position="relative" paddingY="20">
      <Box maxWidth="3xl" marginX="auto" paddingX="6">
        <Box>
          <Heading marginBottom="6" size="3xl">
            Sergio Aramburu
          </Heading>
        </Box>
        <HStack marginTop="9" gap={{ base: "8", md: "10" }}>
          <LinkItem href={siteConfig.profiles.github} icon={GitHubIcon}>
            GitHub
          </LinkItem>
          <LinkItem href={siteConfig.profiles.linkedin} icon={LinkedInIcon}>
            LinkedIn
          </LinkItem>
        </HStack>
      </Box>
    </Box>
  );
}
