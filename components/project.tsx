import { Card, Stack, Link, Text, Heading, Button } from "@chakra-ui/react";
import { ExternalLink } from "lucide-react";

export default function Project() {
  return (
    <Card.Root
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      bg="#333842"
      color="#bbc2cf"
    >
      <Stack>
        <Card.Body>
          <Heading size="lg">UVigo Motorsport</Heading>

          <Text py="2">
            UVigo Motorsport is a Formula Student team which is part of the
            University of Vigo. I am part of the Driverless team where we
            develop an Autonomous System to compete at Formula Student events.
          </Text>
        </Card.Body>

        <Card.Footer alignItems={"end"}>
          <Button variant="ghost">
            <Link
              href="https://uvigomotorsport.com"
              color="#bbc2cf"
              target="_blank"
            >
              UVigo Motorsport <ExternalLink size={10} />
            </Link>
          </Button>
        </Card.Footer>
      </Stack>
    </Card.Root>
  );
}
