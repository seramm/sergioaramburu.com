import {
  Box,
  Flex,
  HStack,
  Stack,
  Spacer,
  Text,
  useDisclosure,
  DrawerBackdrop,
  DrawerContent,
  Center,
  Icon,
  StackProps,
  useBreakpointValue,
  StackSeparator,
  DrawerRoot,
  DrawerTrigger,
  DrawerContext,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { CloseIcon, MenuIcon, ServerRackIcon } from "./icons";
import { ElementType, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth, LogoutButton } from "./session";

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
      asChild
      rounded="lg"
      gap="2"
      paddingX="3"
      paddingY={large ? "5" : "2.5"}
      aria-current={active ? "page" : undefined}
      _hover={{ color: "gray.900" }}
    >
      <Link href={data.href}>
        <Icon as={data.icon} fontSize="lg" />
        <Text fontFamily="heading">{children}</Text>
      </Link>
    </HStack>
  );
}

function NavbarItems(props: StackProps) {
  const isLoggedIn = useAuth();
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
      {isLoggedIn && <LogoutButton />}
    </HStack>
  );
}

function MobileNavbarItems(props: StackProps) {
  const isLoggedIn = useAuth();
  return (
    <Stack
      separator={<StackSeparator borderColor="gray.900" />}
      as="nav"
      gap="0"
      {...props}
    >
      {items.map((item) => (
        <NavbarItem key={item.label} data={item} large>
          {item.label}
        </NavbarItem>
      ))}
      {isLoggedIn && <LogoutButton />}
    </Stack>
  );
}

// function MobileNavbar() {
//   const menu = useDisclosure();
//   const breakpoint = useBreakpointValue({ base: true, md: false });
//
//   useEffect(() => {
//     if (menu.open && !breakpoint) {
//       menu.onClose();
//     }
//   }, [breakpoint, menu]);
//
//   return (
//     <>
//       <Center
//         width="10"
//         height="10"
//         display={{ base: "flex", md: "none" }}
//         as="button"
//         aria-expanded={menu.open}
//         onClick={menu.onOpen}
//       >
//         {menu.open ? <CloseIcon /> : <MenuIcon />}
//       </Center>
//       <Drawer isOpen={menu.open} placement="bottom" onClose={menu.onClose}>
//         <DrawerBackdrop />
//         <DrawerContent id="nav-menu" bg="gray.200" padding="6">
//           <MobileNavbarItems />
//         </DrawerContent>
//       </Drawer>
//     </>
//   );
// }

function MobileNavbar() {
  const menu = useDisclosure();
  const breakpoint = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    if (menu.open && !breakpoint) {
      menu.onClose();
    }
  }, [breakpoint, menu]);

  return (
    <>
      <DrawerRoot placement="bottom">
        <DrawerTrigger asChild>
          <Center
            width="10"
            height="10"
            display={{ base: "flex", md: "none" }}
            as="button"
          >
            <DrawerContext>
              {(drawer) => (drawer.open ? <CloseIcon /> : <MenuIcon />)}
            </DrawerContext>
          </Center>
        </DrawerTrigger>
        <DrawerBackdrop />
        <DrawerContent id="nav-menu" bg="gray.200" padding="6">
          <MobileNavbarItems />
        </DrawerContent>
      </DrawerRoot>
    </>
  );
}

export default function NavBar() {
  return (
    <Flex
      as="header"
      paddingY="6"
      maxWidth="4xl"
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
