import { HStack, Icon, SystemProps, Text } from '@chakra-ui/react'
import { ElementType } from 'react'

const LinkItem = ({ children, icon, href }) => {
  return (
    <HStack as="a" href={href} rel="noopener" target="_blank" spacing="3">
      <Icon aria-hidden as={icon} fontSize="xl" />
      <Text
        textDecoration="underline"
        textDecorationThickness="1px"
        textUnderlineOffset="3px"
      >
        {children}
      </Text>
    </HStack>
  )
}

export default LinkItem
