import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export function LogoutButton() {
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem("access_token");
    router.push("/");
  };
  return <Button onClick={logout}>Logout</Button>;
}

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the token is available in localStorage
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      setIsLoggedIn(!!token); // Set state to true if token exists
    }
  }, []);

  return isLoggedIn;
}
