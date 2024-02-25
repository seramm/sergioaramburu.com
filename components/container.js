import { Box } from '@chakra-ui/react'
import Footer from '../components/footer'
import React from 'react'

const Container = ({children, gradient}) => {
  return (
    <Box>
      <Box maxWidth="6xl" marginX="auto" paddingX="6">
        <Box as="main" id="content" position="relative" zIndex={1}>
          {children}
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}
export default Container
