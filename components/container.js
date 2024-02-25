import { Box } from '@chakra-ui/react'
import Footer from '../components/footer'
import NavBar from '../components/navbar'
import React from 'react'

const Container = ({ children }) => {
  return (
    <Box>
      <NavBar />
      <Box maxWidth="4xl" marginX="auto" paddingX="6">
        <Box as="main" id="content" position="relative" zIndex={1} pb={6}>
          {children}
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}
export default Container
