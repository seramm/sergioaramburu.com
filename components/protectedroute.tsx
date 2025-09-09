import { useAuth } from "context/session";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}
export default function ProtectedRoute({children, redirectTo = "/login"}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) router.push("/login");
  }, [user, router, redirectTo]);
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Loading...</div>;

  return <>{children}</>;
}
