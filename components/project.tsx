import {
  Box,
  Card,
  Stack,
  Link,
  Text,
  Heading,
  Button,
} from "@chakra-ui/react";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "next-i18next";

type ProjectProps = {
  id: string;
};

const projects = ["um", "website"];

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
  return (
    <Card.Root
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      bg="#333842"
      color="lightblue.0"
    >
      <Stack>
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
    </Card.Root>
  );
}
