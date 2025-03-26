import { Box, Text, Table } from "@chakra-ui/react";
import Footer from "components/footer";
import NavBar from "components/navbar";
import ApiCheck from "components/api";

export default function Page() {
  return (
    <Box>
      <NavBar />
      <Box maxWidth="3xl" marginX="auto" paddingX="6">
        <Box display={{ md: "flex" }} py={9}>
          <Table.Root variant="outline">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Endpoint</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">Status</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Text>API</Text>
                </Table.Cell>
                <Table.Cell textAlign="end">
                  <ApiCheck />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
