import { Box } from '@chakra-ui/react'
import Image from 'next/image'

const NavBar = props => {
  const { path } = props

  return (
    <Box as="header" paddingY="6" maxWidth="4xl" marginX="auto" paddingX="6">
      <Box
        borderColor="whiteAlpha.800"
        borderWidth={2}
        borderStyle="solid"
        w="50px"
        h="50px"
        display="inline-block"
        borderRadius="full"
        overflow="hidden"
      >
        <Image
          src="/images/profile.png"
          width="100"
          height="100"
          alt="Profile"
        />
      </Box>
    </Box>
  )
}

export default NavBar
