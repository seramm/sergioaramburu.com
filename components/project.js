import {
  Card,
  Stack,
  CardBody,
  CardFooter,
  Link,
  Text,
  Heading,
  Button
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

const Project = () => {
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
      bg="#333842"
      color="#bbc2cf"
    >
      <Stack>
        <CardBody>
          <Heading size="md">UVigo Motorsport</Heading>

          <Text py="2">
            UVigo Motorsport is a Formula Student team which is part of the
            University of Vigo. I am part of the Driverless team where we
            develop an Autonomous System to compete at Formula Student events.
          </Text>
        </CardBody>

        <CardFooter alignItems={'end'}>
          <Button variant="ghost">
            <Link href="https://uvigomotorsport.com" color="#bbc2cf" isExternal>
              UVigo Motorsport <ExternalLinkIcon mx="2px" />
            </Link>
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  )
}

export default Project
