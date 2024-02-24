import { Container, Box, Heading } from '@chakra-ui/react'

const Page = () => {
  return (
    <Container>
      <Box borderRadius="lg" bg="blue" p={3} mb={6} align="center">
        Computer Science Engineering student based in Galicia, Spain
      </Box>

      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            Sergio Aramburu
          </Heading>
          <p>Computer Science student</p>
        </Box>
      </Box>
    </Container>
  )
}

export default Page
