import Head from 'next/head'
import {Box, Container } from '@chakra-ui/react'

const Main = ({ children, router}) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.gif" sizes="any" />
        <title>Sergio Aramburu</title>
      </Head>

      <Container maxW="container.sd" pt={14}>
        {children}
      </Container>
    </Box>
  )
}

export default Main
