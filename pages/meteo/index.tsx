import Container from "components/container";
import ProtectedRoute from "components/protectedroute";
import { Dashboard } from "components/plot";

export default function Page() {
  return (
    <Container>
      <Dashboard />
    </Container>
  );
}
