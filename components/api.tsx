import { useEffect, useState } from "react";
import { Status } from "@chakra-ui/react";

export default function ApiCheck() {
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
