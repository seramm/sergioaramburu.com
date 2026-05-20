import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  RadioCard,
  Separator,
  Skeleton,
  TagsInput,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  RectangleHorizontal,
  RectangleVertical,
} from "lucide-react";
import { useEffect, useState } from "react";

interface ImageProps {
  name: string;
  tags: string[] | null;
  orientation: string;
}

export function TagEditor({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: (tags: string[]) => void;
}) {
  return (
    <HStack>
      <TagsInput.Root value={tags} onValueChange={(d) => setTags(d.value)}>
        <TagsInput.Label>Tags</TagsInput.Label>
        <HStack>
          <TagsInput.Control>
            <TagsInput.Items />
            <TagsInput.Input color="gray.900" placeholder="Add tag..." />
          </TagsInput.Control>
        </HStack>
      </TagsInput.Root>
    </HStack>
  );
}

export function OrientationEditor({
  orientation,
  setOrientation,
}: {
  orientation: string;
  setOrientation: (val: string) => void;
}) {
  return (
    <RadioCard.Root
      size="md"
      value={orientation}
      onValueChange={(e) => setOrientation(e.value)}
    >
      <RadioCard.Label>Image Orientation</RadioCard.Label>
      <HStack align="stretch">
        <RadioCard.Item value="horizontal">
          <RadioCard.ItemHiddenInput />
          <RadioCard.ItemControl>
            <RectangleHorizontal />
            <RadioCard.ItemText fontSize="md">Horizontal</RadioCard.ItemText>
            <RadioCard.ItemIndicator />
          </RadioCard.ItemControl>
        </RadioCard.Item>
        <RadioCard.Item value="vertical">
          <RadioCard.ItemHiddenInput />
          <RadioCard.ItemControl>
            <RectangleVertical />
            <RadioCard.ItemText fontSize="md">Vertical</RadioCard.ItemText>
            <RadioCard.ItemIndicator />
          </RadioCard.ItemControl>
        </RadioCard.Item>
      </HStack>
    </RadioCard.Root>
  );
}

function CarouselImage({ img }: { img: any }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Flex minW="100%" h="100%" pos="relative" justify="center" align="center">
      <Image
        src={`https://buru-gallery.b-cdn.net/${img.name}`}
        alt={img.name}
        objectFit="contain"
        width="100%"
        height="100%"
        onLoad={() => setIsLoaded(true)}
        opacity={isLoaded ? 1 : 0}
        transition="opacity 0.3s"
      />
    </Flex>
  );
}

function ImageCarousel({
  images,
  currentIndex,
  setCurrentIndex,
}: {
  images: any[];
  currentIndex: number;
  setCurrentIndex: (idx: number) => void;
}) {
  const prevImage = () => {
    // setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const nextImage = () => {
    // setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  // if (images.length === 0) return;
  return (
    <Box
      position="relative"
      width="100%"
      height="100%"
      overflow="hidden"
      borderRadius="lg"
      flex="1"
    >
      {images.length > 0 ? (
        <Box height="100%" width="100%">
          <IconButton
            aria-label="Anterior"
            position="absolute"
            left="10px"
            top="50%"
            transform="translateY(-50%)"
            zIndex={2}
            onClick={prevImage}
            variant="ghost"
            colorScheme="whiteAlpha"
          >
            <ChevronLeftIcon />
          </IconButton>
          <Flex
            transition="all 0.5s ease-in-out"
            transform={`translateX(-${currentIndex * 100}%)`}
            width="full"
            height="full"
            alignItems="center"
          >
            {images.map((img, index) => (
              <CarouselImage key={index} img={img} />
            ))}
          </Flex>
          {/* Botón Derecho */}
          <IconButton
            aria-label="Siguiente"
            position="absolute"
            right="10px"
            top="50%"
            transform="translateY(-50%)"
            zIndex={2}
            onClick={nextImage}
            variant="ghost"
            colorScheme="whiteAlpha"
          >
            <ChevronRightIcon />
          </IconButton>
          {/* Indicadores (Puntitos) */}
          <HStack
            position="absolute"
            bottom="10px"
            left="50%"
            transform="translateX(-50%)"
            zIndex={2}
          >
            {images.map((_, i) => (
              <Box
                key={i}
                w="8px"
                h="8px"
                borderRadius="full"
                bg={i === currentIndex ? "white" : "whiteAlpha.500"}
              />
            ))}
          </HStack>
        </Box>
      ) : (
        <Flex
          minW="100%"
          h="100%"
          pos="relative"
          justify="center"
          align="center"
        >
          <Skeleton
            pos="absolute"
            top={0}
            left={0}
            w="100%"
            h="100%"
            zIndex={1}
          />
        </Flex>
      )}
    </Box>
  );
}

export function GalleryManager() {
  const [imagesData, setImagesData] = useState<ImageProps[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [orientation, setOrientation] = useState<string>("");
  const handleSave = async () => {
    const currentImage = imagesData[currentIndex];
    try {
      const res = await fetch(
        "https://sergioaramburu.com/api/gallery/edit_image",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: currentImage.name,
            tags: tags,
            orientation: orientation,
          }),
          credentials: "include",
        },
      );
      if (res.ok) {
        const updatedImages = [...imagesData];
        updatedImages[currentIndex] = {
          ...currentImage,
          tags: tags,
          orientation: orientation,
        };
        setImagesData(updatedImages);
      }
    } catch (err) {
      console.error("Error saving", err);
    }
  };

  useEffect(() => {
    const current = imagesData[currentIndex];
    if (current) {
      setTags(current.tags || []);
      setOrientation(current.orientation || "");
    }
  }, [currentIndex, imagesData]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch(
          "https://sergioaramburu.com/api/gallery/images",
          {
            method: "GET",
            credentials: "include",
          },
        );
        if (res.ok) {
          const data: ImageProps[] = await res.json();
          setImagesData(data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchImages();
  }, []);

  return (
    <Box p={5} width="100%" height="xl" borderWidth="2px" borderRadius={10}>
      <HStack h="100%">
        <ImageCarousel
          images={imagesData}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        <VStack
          width="38.2% "
          height="100%"
          align="stretch"
          justify="flex-start"
        >
          <TagEditor tags={tags} setTags={setTags} />
          <OrientationEditor
            orientation={orientation}
            setOrientation={setOrientation}
          />
          <Separator my={4} />
          <Button type="submit" size="sm" onClick={() => handleSave()}>
            Save
          </Button>
        </VStack>
      </HStack>
    </Box>
  );
}
