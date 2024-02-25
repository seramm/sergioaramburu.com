import { Box, Heading } from '@chakra-ui/react'
import Container from '../components/container'
import Image from 'next/image'

const Page = () => {
  return (
    <Container>
      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title" color="#ffffff">
            Sergio Aramburu
          </Heading>
          <p>Computer Science Student</p>
        </Box>
        <Box
        >
          <Box
            borderColor="whiteAlpha.800"
            borderWidth={2}
            borderStyle="solid"
            w="100px"
            h="100px"
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
      </Box>
    </Container>
  )
}

export default Page
