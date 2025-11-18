import {
  Box,
  Button,
  Field,
  HStack,
  Input,
  InputGroup,
  Separator,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { startRegistration } from "@simplewebauthn/browser";
import { KeySquare, User } from "lucide-react";
import { useState } from "react";

export function PasskeyManager() {
  const [username, setUsername] = useState("");
  const [invalid, setInvalid] = useState(false);

  async function handleRegister() {
    try {
      const response = await fetch(
        "https://sergioaramburu.com/api/fido/register/begin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username }),
        },
      );
      const options = await response.json();

      const credential = await startRegistration(options.publicKey);

      const verificationResp = await fetch(
        "https://sergioaramburu.com/api/fido/register/complete",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, attestation_response: credential }),
        },
      );

      if (!verificationResp.ok) {
        setInvalid(true);
        throw new Error("Registration failed");
      }
    } catch (err) {
      setInvalid(true);
      console.error(err);
    }
  }
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInvalid(false);
    setUsername(e.target.value);
  }

  return (
    <Box p={5} maxW="sm" borderWidth="2px" borderRadius={10}>
      <VStack align="start">
        <HStack>
          <KeySquare />
          <Text fontWeight="bold" textStyle="xl">
            Passkey Management
          </Text>
        </HStack>
        <Separator />
        <Field.Root invalid={invalid}>
          <InputGroup startElement={<User />}>
            <Input
              value={username}
              onChange={handleInputChange}
              placeholder="Username"
            />
          </InputGroup>
          <Field.ErrorText>
            User might not exist in the database
          </Field.ErrorText>
        </Field.Root>
        <Button onClick={handleRegister} size="sm">
          Register Passkey
        </Button>
      </VStack>
    </Box>
  );
}
