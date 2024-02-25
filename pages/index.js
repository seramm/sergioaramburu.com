import { Box, Heading } from '@chakra-ui/react'
import Container from '../components/container'

const Page = () => {
  return (
    <Container>
      <Box display={{ md: 'flex' }} py={9}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title" color="#ffffff">
            Sergio Aramburu
          </Heading>
          <p>Computer Science Student</p>
        </Box>
      </Box>
    </Container>
  )
}

export default Page
