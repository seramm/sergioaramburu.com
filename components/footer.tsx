import { Box, Heading, HStack, Spacer, Spinner, Text } from "@chakra-ui/react";
import LinkItem from "./link-item";
import siteConfig from "data";
import { useEffect, useState } from "react";
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
          <Spacer />
          <Box>
            <HStack>
              <Text>API: </Text>
              <ApiCheck />
            </HStack>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
}
function ApiCheck() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetch("https://sergioaramburu.com/api/")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.status);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  if (!posts)
    return (
      <Text>
        <Spinner size="xs" /> Checking...
      </Text>
    );
}
