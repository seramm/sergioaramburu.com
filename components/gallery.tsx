import {
  Box,
  CheckboxCard,
  HStack,
  Image,
  VStack,
  Text,
  Separator,
} from "@chakra-ui/react";
import { Masonry } from "@mui/lab";
import { useEffect, useState } from "react";

interface ImageProps {
  name: string;
  tags: string[] | null;
  orientation: string;
}
interface TagProps {
  name: string;
  checked: string | "off";
}
interface GalleryFilterProps {
  activeTags: string[];
  setActiveTags: (tags: string[]) => void;
}

export function SmallGallery() {
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
      <Masonry columns={3} spacing={1}>
        {posts.map((image, index) => (
          <Box key={index}>
            <Image
              src={`https://sergioaramburu.com/api/images/${image}`}
              alt={index}
              rounded="sm"
            />
          </Box>
        ))}
      </Masonry>
    </Box>
  );
}

export function GalleryFilter({
  activeTags,
  setActiveTags,
}: GalleryFilterProps) {
  const [tags, setTags] = useState<string[]>([]);
  useEffect(() => {
    fetch("https://sergioaramburu.com/api/gallery/tags")
      .then((res) => res.json())
      .then((data) => {
        setTags(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleToggle = (tagName: string, isChecked: boolean) => {
    if (isChecked) {
      setActiveTags([...activeTags, tagName]);
    } else {
      setActiveTags(activeTags.filter((name) => name !== tagName));
    }
  };

  return (
    <Box p={3} minWidth="md" borderWidth="1px" borderRadius={10}>
      <Text fontWeight="bold" textStyle="md" mb="5px">
        Tags
      </Text>
      <HStack>
        {tags.map((tag, index) => (
          <CheckboxCard.Root
            key={index}
            checked={activeTags.includes(tag)}
            onCheckedChange={(e) => handleToggle(tag, !!e.checked)}
            size="sm"
          >
            <CheckboxCard.HiddenInput />
            <CheckboxCard.Control>
              <CheckboxCard.Content>
                <CheckboxCard.Label>{tag}</CheckboxCard.Label>
              </CheckboxCard.Content>
              <CheckboxCard.Indicator />
            </CheckboxCard.Control>
          </CheckboxCard.Root>
        ))}
      </HStack>
    </Box>
  );
}

export function BigGallery() {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [activeTags, setActiveTags] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://sergioaramburu.com/api/gallery/db_images")
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const filteredImages =
    activeTags.length === 0
      ? images
      : images.filter((img) => img.tags?.some((t) => activeTags.includes(t)));

  if (!images) return <div>Loading...</div>;
  return (
    <Box>
      <VStack>
        <GalleryFilter activeTags={activeTags} setActiveTags={setActiveTags} />
        <Separator />
        <Masonry columns={4} spacing={1}>
          {filteredImages.map((img, index) => (
            <Box key={index}>
              <Image
                src={`https://buru-gallery.b-cdn.net/${img.name}`}
                alt={img.name}
                rounded="sm"
              />
            </Box>
          ))}
        </Masonry>
      </VStack>
    </Box>
  );
}
