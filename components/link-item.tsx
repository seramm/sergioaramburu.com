import { HStack, Icon, Link, Text } from "@chakra-ui/react";
import { ElementType } from "react";

type LinkItemProps = {
  icon: ElementType;
  children: string;
  href: string;
};

export default function LinkItem(props: LinkItemProps) {
  const { icon, children, href } = props;
  return (
    <HStack asChild rel="noopener" gap="3">
      <Link href={href} target="_blank">
        <Icon aria-hidden as={icon} fontSize="xl" />
        <Text
          textDecoration="underline"
          textDecorationThickness="1px"
          textUnderlineOffset="3px"
        >
          {children}
        </Text>
      </Link>
    </HStack>
  );
}
