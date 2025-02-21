import { Card, Stack, Link, Text, Heading, Button } from "@chakra-ui/react";
import { ExternalLink } from "lucide-react";

export default function Project() {
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
          <Heading size="xl">UVigo Motorsport</Heading>

          <Text py="2">
            UVigo Motorsport is a Formula Student team which is part of the
            University of Vigo. I have been part of the Driverless team for a
            year and a half. There I helped develop an Autonomous System to
            compete at Formula Student events. This opportunity allowed me to
            understand the true world of software development. Inside UVigo
            Motorsport I made my first contact with Python while using ROS.
          </Text>
        </Card.Body>

        <Card.Footer alignItems={"end"}>
          <Link href="https://uvigomotorsport.com" target="_blank">
            <Button variant="ghost" color="lightblue.0">
              <Text fontWeight="semibold" textStyle="md">
                UVigo Motorsport
              </Text>{" "}
              <ExternalLink />
            </Button>
          </Link>
        </Card.Footer>
      </Stack>
    </Card.Root>
  );
}
