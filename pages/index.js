import { Box, Divider, Heading } from '@chakra-ui/react'
import Container from '../components/container'
import Project from '../components/project'

const Page = () => {
  return (
    <Container>
      <Box display={{ md: 'flex' }} py={9}>
        <Box flexGrow={1}>
          <Heading size="3xl" mb={1} variant="page-title" color="#ffffff">
            Sergio Aramburu
          </Heading>
          <p>Computer Science Student</p>
        </Box>
      </Box>
      <Box py={9}>
        <Divider />
        <Heading size="2xl" variant="section" my={9} color="#ffffff">
          Projects
        </Heading>
        <Project />
      </Box>
    </Container>
  )
}

export default Page
