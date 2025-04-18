import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      setAuth(true);
    } else {
      localStorage.setItem("redirectTo", window.location.pathname);
      setAuth(false);
      router.push("/login");
    }

    setLoading(false);
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return <>{auth ? children : null}</>;
}
