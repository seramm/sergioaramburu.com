import { Box, Separator, Heading, HeadingProps } from "@chakra-ui/react";
import Container from "components/container";
import Gallery from "components/gallery";
import ProjectsCards from "components/project";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

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
  const { t, ready } = useTranslation("home");
  return (
    <Container>
      <Box flexGrow={1} py={9}>
        <HeadHeading>Sergio Aramburu</HeadHeading>
        <p>{ready ? t("heading") : ""}</p>
      </Box>
      <Box>
        <p>{ready ? t("text") : ""}</p>
      </Box>
      <Box py={9}>
        <Separator />
        <SectionHeading>{ready ? t("projects") : ""}</SectionHeading>
        <ProjectsCards />
      </Box>
      <Box py={9}>
        <SectionHeading>{ready ? t("photography") : ""}</SectionHeading>
        <Gallery />
      </Box>
    </Container>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["home", "projects"])),
    },
  };
}
