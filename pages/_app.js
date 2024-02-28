import { ChakraProvider } from '@chakra-ui/react'
import theme from '../lib/theme'

const Website = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default Website
