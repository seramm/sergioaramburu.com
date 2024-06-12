import { Box, Divider, Flex, Heading } from '@chakra-ui/react'
import Container from '../components/container'
import Project from '../components/project'

export default function Page() {
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
      <Box>
        <p>
          I am a bachelor&apos;s degree student based in Galicia, Spain. I am
          intrigued by Data Science and how apparent useless data can lead to
          solving highly complex problems that we face every day. Not only am I
          interested in computer-related topics, but I am also passionate about
          art. I cannot separate myself from music, photography and
          architecture.
        </p>
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
