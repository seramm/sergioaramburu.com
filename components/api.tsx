import { useEffect, useState } from "react";
import { Status } from "@chakra-ui/react";

export function ApiCheck() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://sergioaramburu.com/api")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setError(null);
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
  }, []);

  if (!posts) {
    if (error) {
      return (
        <Status.Root size="md" colorPalette="orange">
          <Status.Indicator />
          Something went wrong
        </Status.Root>
      );
    } else {
      return (
        <Status.Root size="md" colorPalette="red">
          <Status.Indicator />
          Down
        </Status.Root>
      );
    }
  } else {
    return (
      <Status.Root size="md" colorPalette="green">
        <Status.Indicator />
        Working
      </Status.Root>
    );
  }
}

export async function login(username: string, password: string) {
  const response = await fetch("https://sergioaramburu.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      username,
      password,
    }),
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();

  return data.access_token;
}
