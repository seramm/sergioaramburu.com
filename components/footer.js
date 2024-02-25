import { Box, Heading, HStack } from '@chakra-ui/react'
import LinkItem from './link-item'
import siteConfig from '../data.js'
import GitHubIcon from './icons'

const Footer = () => {
  return (
    <Box as="footer" position="relative" paddingY="20">
      <Box maxWidth="6xl" marginX="auto" paddingX="6">
        <Box>
          <Heading marginBottom="6" size="lg">
            Sergio Aramburu
          </Heading>
        </Box>
        <HStack marginTop="9" spacing={{ base: '8', md: '10' }}>
          <LinkItem href={siteConfig.profiles.github} icon={GitHubIcon}>
            GitHub
          </LinkItem>
        </HStack>
      </Box>
    </Box>
  )
}

export default Footer
