import { Box, Separator, Heading, HeadingProps } from "@chakra-ui/react";
import Container from "components/container";
import Gallery from "components/gallery";
import Project from "components/project";

function HeadHeading(props: HeadingProps) {
  return (
    <Heading
      width="full"
      fontFamily="heading"
      fontSize={{ base: "3rem", md: "4rem" }}
      letterSpacing="tight"
      lineHeight="1"
      mb={1}
      color="#ffffff"
      {...props}
    />
  );
}

function SectionHeading(props: HeadingProps) {
  return (
    <Heading
      size="5xl"
      fontFamily="heading"
      letterSpacing="tight"
      lineHeight="1"
      my={9}
      color="#ffffff"
      textDecoration="underline"
      textDecorationColor="#8e9aaf"
      textDecorationThickness="5px"
      {...props}
    />
  );
}

export default function Page() {
  return (
    <Container>
      <Box display={{ md: "flex" }} py={9}>
        <Box flexGrow={1}>
          <HeadHeading>Sergio Aramburu</HeadHeading>
          <p>Computer Science Student</p>
        </Box>
      </Box>
      <Box>
        <p>
          I am a bachelor&apos;s degree student based in Galicia, Spain. I am
          intrigued by Data Science and how apparent useless data can lead to
          solving highly complex problems that we face every day. Not only am I
          interested in computer-related topics, but I am also passionate about
          art. I cannot separate myself from music, photography and
          architecture.
        </p>
      </Box>
      <Box py={9}>
        <Separator />
        <SectionHeading>Projects</SectionHeading>
        <Project />
      </Box>
      <Box py={9}>
        <SectionHeading>Photography</SectionHeading>
        <Gallery />
      </Box>
    </Container>
  );
}
