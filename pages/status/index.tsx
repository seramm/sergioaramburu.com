import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import React from "react";

export default function Page() {
  const [health, setHealth] = useState("");

  useEffect(() => {
    const getStatus = async () => {
      const response = await fetch(
        "http://localhost:8081/v1/health-check/liveness",
        {
          method: "GET",
        },
      );
      let status: { [status: string]: string } = {};
      try {
        status = await response.json();
      } catch (err) {
        console.log(`failed to get backend status. ${err}`);
      }
      setHealth(status["status"] || "unknown");
    };
    getStatus();
  }, []);

  return (
    <Box maxWidth="3xl" marginX="auto" paddingX="6" paddingY="10">
      <Heading>FastAPI Health Check</Heading>
      <Text>Status: {health}</Text>
    </Box>
  );
}
