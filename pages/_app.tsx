import { ChakraProvider } from '@chakra-ui/react'
import theme from '../lib/theme'
import Head from 'next/head'

const Website = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Sergio Aramburu</title>
      </Head>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default Website
