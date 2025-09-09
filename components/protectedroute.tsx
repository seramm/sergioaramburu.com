import { useAuth } from "context/session";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ProtectedRoute({ children, redirectTo = "/login" }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) router.push("/login");
  }, [user, router, redirectTo]);
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Loading...</div>;

  return <>{children}</>;
}
