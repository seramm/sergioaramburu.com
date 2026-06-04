import {
  Box,
  CheckboxCard,
  HStack,
  Image,
  VStack,
  Text,
  Separator,
  Dialog,
  Portal,
} from "@chakra-ui/react";
import { Masonry } from "@mui/lab";
import { useEffect, useState } from "react";
import { sampleArray } from "utils/array";

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
  const [images, setImages] = useState<ImageProps[]>([]);
  useEffect(() => {
    fetch("https://sergioaramburu.com/api/gallery/db_images")
      .then((res) => res.json())
      .then((data) => {
        const sample: ImageProps[] = sampleArray(data, 10);
        setImages(sample);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <Box>
      <Masonry columns={3} spacing={1}>
        {images.map((image, index) => (
          <Box key={index}>
            <Image
              src={`https://buru-gallery.b-cdn.net/small/${image.name}`}
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
  const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null);

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
            <Box
              key={index}
              cursor="pointer"
              overflow="hidden"
              onClick={() => setSelectedImage(img)}
            >
              <Image
                src={`https://buru-gallery.b-cdn.net/small/${img.name}`}
                alt={img.name}
                rounded="sm"
              />
            </Box>
          ))}
        </Masonry>
      </VStack>
      <Dialog.Root
        placement="center"
        open={!!selectedImage}
        onOpenChange={(details) => {
          if (!details.open) setSelectedImage(null);
        }}
      >
        <Portal>
          <Dialog.Backdrop />

          <Dialog.Positioner>
            <Dialog.Content
              bg="white"
              w={{ base: "100vw", md: "90vw" }}
              h={{ base: "100dvh", md: "90vh" }}
              maxW="1400px"
            >
              <Dialog.CloseTrigger />

              <Dialog.Body
                p={2}
                h="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {selectedImage && (
                  <Image
                    src={`https://buru-gallery.b-cdn.net/medium/${selectedImage.name}`}
                    alt={selectedImage.name}
                    w="100%"
                    h="100%"
                    objectFit="contain"
                  />
                )}
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
}
