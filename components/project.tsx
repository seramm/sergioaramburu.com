import {
  Box,
  Card,
  Stack,
  Link,
  Text,
  Heading,
  Button,
  Image,
} from "@chakra-ui/react";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "next-i18next/pages";

type ProjectProps = {
  id: string;
};

const projects = ["um", "website"];

const projectImages: Record<string, string> = {
  um: "/images/um.png",
};

export default function ProjectsCards() {
  return (
    <Box>
      {projects.map((id) => (
        <Box key={id} pb={5}>
          <ProjectCard key={id} id={id} />
        </Box>
      ))}
    </Box>
  );
}

function ProjectCard({ id }: ProjectProps) {
  const { t } = useTranslation("projects");

  const link = t(`${id}.button-link`, { defaultValue: "" });
  const buttonText = t(`${id}.button-text`, { defaultValue: "" });
  const paragraph = t(`${id}.description`, { returnObjects: true }) as string[];
  const image = projectImages[id];
  return (
    <Card.Root
      overflow="hidden"
      variant="outline"
      bg="#333842"
      color="lightblue.0"
    >
      <Stack direction={{ base: "column", sm: "row" }}>
        <Stack flex="1">
          <Card.Body>
            <Heading size="xl">{t(`${id}.title`)}</Heading>

            {paragraph.map((paragraph: string, i: number) => (
              <Text key={i} py="2">
                {paragraph}
              </Text>
            ))}
          </Card.Body>

          {link && (
            <Card.Footer alignItems={"end"}>
              <Link href={link} target="_blank">
                <Button variant="ghost" color="lightblue.0">
                  <Text fontWeight="semibold" textStyle="md">
                    {buttonText}
                  </Text>{" "}
                  <ExternalLink />
                </Button>
              </Link>
            </Card.Footer>
          )}
        </Stack>
        {image && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            maxW={{ base: "100%", sm: "200px" }}
            p={4}
            mr={4}
          >
            <Image
              src={image}
              alt={t(`${id}.title`)}
              objectFit="contain"
              maxH="150px"
            />
          </Box>
        )}
      </Stack>
    </Card.Root>
  );
}
