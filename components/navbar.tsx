import {
  Box,
  Flex,
  HStack,
  Stack,
  Spacer,
  Text,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Center,
  Icon,
  StackProps,
  useBreakpointValue,
  StackDivider,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { CloseIcon, MenuIcon, ServerRackIcon } from "./icons";
import { ElementType, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";

type NavbarItemProps = {
  data: NavbarItemData;
  active?: boolean;
  children: ReactNode;
  large?: boolean;
};

interface NavbarItemData {
  label: string;
  href: string;
  icon: ElementType;
  primary?: boolean;
}

const items: NavbarItemData[] = [
  { label: "Cloud", href: "/architecture", icon: ServerRackIcon },
];

function NavbarItem(props: NavbarItemProps) {
  const { children, data, active, large } = props;
  return (
    <HStack
      as={Link}
      href={data.href}
      rounded="lg"
      spacing="2"
      paddingX="3"
      paddingY={large ? "5" : "2.5"}
      aria-current={active ? "page" : undefined}
      _hover={{ color: "gray.900" }}
    >
      <Icon as={data.icon} fontSize="lg" />
      <Text fontFamily="heading">{children}</Text>
    </HStack>
  );
}

function NavbarItems(props: StackProps) {
  const { asPath } = useRouter();
  return (
    <HStack as="nav" display={{ base: "none", md: "flex" }} {...props}>
      {items.map((item) => (
        <NavbarItem
          key={item.label}
          data={item}
          active={asPath.startsWith(item.href)}
        >
          {item.label}
        </NavbarItem>
      ))}
    </HStack>
  );
}

function MobileNavbarItems(props: StackProps) {
  return (
    <Stack
      divider={<StackDivider borderColor="gray.900" />}
      as="nav"
      spacing="0"
      {...props}
    >
      {items.map((item) => (
        <NavbarItem key={item.label} data={item} large>
          {item.label}
        </NavbarItem>
      ))}
    </Stack>
  );
}

function MobileNavbar() {
  const menu = useDisclosure();
  const breakpoint = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    if (menu.isOpen && !breakpoint) {
      menu.onClose();
    }
  }, [breakpoint, menu]);

  return (
    <>
      <Center
        width="10"
        height="10"
        display={{ base: "flex", md: "none" }}
        as="button"
        aria-expanded={menu.isOpen}
        onClick={menu.onOpen}
      >
        {menu.isOpen ? <CloseIcon /> : <MenuIcon />}
      </Center>
      <Drawer isOpen={menu.isOpen} placement="bottom" onClose={menu.onClose}>
        <DrawerOverlay />
        <DrawerContent id="nav-menu" bg="gray.200" padding="6">
          <MobileNavbarItems />
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default function NavBar() {
  return (
    <Flex
      as="header"
      paddingY="6"
      maxWidth="3xl"
      marginX="auto"
      paddingX="6"
      align="center"
    >
      <Box
        borderColor="whiteAlpha.800"
        borderWidth={2}
        borderStyle="solid"
        w="75px"
        h="75px"
        display="inline-block"
        borderRadius="full"
        overflow="hidden"
      >
        <Link href="/">
          <Image
            src="/images/profile.jpg"
            width="100"
            height="100"
            alt="Profile"
          />
        </Link>
      </Box>
      <Spacer />
      <NavbarItems />
      <MobileNavbar />
    </Flex>
  );
}
