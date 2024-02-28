import { Box, Heading } from '@chakra-ui/react'
import Container from '../components/container'

const Page = () => {
  return (
    <Container>
      <Box display={{ md: 'flex' }} py={9}>
        <Box flexGrow={1}>
          <Heading size="3xl" variant="page-title" color="#ffffff">
            Sergio Aramburu
          </Heading>
          <p>Computer Science Student</p>
        </Box>
      </Box>
      <Box py={9}>
        <Heading size="2xl" variant="section" mt={9} color="#ffffff">
          Projects
        </Heading>
      </Box>
    </Container>
  )
}

export default Page
