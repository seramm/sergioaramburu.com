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
export function ProtectedAdminRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (!user.isAdmin) {
        router.push("/dashboard");
      }
    }
  }, [user, loading, router]);
  if (loading) return <div>Loading...</div>;
  if (!user || !user.isAdmin) return null;

  return <>{children}</>;
}
