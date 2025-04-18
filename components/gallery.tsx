import { Box, Text } from "@chakra-ui/react";
import { Masonry } from "@mui/lab";
import { useEffect, useState } from "react";

export default function Gallery() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetch("https://sergioaramburu.com/api/n_images/10")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  if (!posts) return <div>Loading...</div>;
  return (
    <Box>
      <Masonry columns={3} spacing={2}>
        {posts.map((image, index) => (
          <Box key={index}>
            <img src={`https://sergioaramburu.com/api/images/${image}`} />
          </Box>
        ))}
      </Masonry>
    </Box>
  );
}
