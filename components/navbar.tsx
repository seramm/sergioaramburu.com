import {
  Box,
  Button,
  Flex,
  HStack,
  Stack,
  Spacer,
  Text,
  Center,
  Icon,
  StackProps,
  StackSeparator,
  Drawer,
  Portal,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { CloseIcon, MenuIcon } from "./icons";
import { ElementType, ReactNode, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "context/session";
import { ChartSpline, Server, LogOut } from "lucide-react";
import { CircleFlag } from "react-circle-flags";
import { changeLanguage } from "i18next";

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
  { label: "Cloud", href: "/architecture", icon: Server },
  { label: "Meteo", href: "/meteo", icon: ChartSpline },
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
        <Icon as={data.icon} size="md" />
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
    </Stack>
  );
}

function MobileNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root
      open={open}
      placement="top"
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Drawer.Trigger asChild>
        <Center
          width="10"
          height="10"
          display={{ base: "flex", md: "none" }}
          as="button"
        >
          <Drawer.Context>
            {(drawer) => (drawer.open ? <CloseIcon /> : <MenuIcon />)}
          </Drawer.Context>
        </Center>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <MobileNavbarItems />
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}

function LanguageSwitcher() {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;

  const changeLanguage = async (lang: string) => {
    await router.push({ pathname, query }, asPath, { locale: lang });
  };
  return (
    <Box mx={5} cursor="pointer">
      {locale === "en" ? (
        <CircleFlag
          countryCode="es"
          width="25"
          onClick={() => changeLanguage("es")}
        />
      ) : (
        <CircleFlag
          countryCode="gb"
          width="25"
          onClick={() => changeLanguage("en")}
        />
      )}
    </Box>
  );
}

function SessionMgt() {
  const { user, logoutUser } = useAuth();
  return (
    <Box mx={1} cursor="pointer">
      {user ? <LogOut onClick={logoutUser} /> : null}
    </Box>
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
      <LanguageSwitcher />
      <SessionMgt />
      <MobileNavbar />
    </Flex>
  );
}
