import React, { ReactElement } from 'react'
import { Container, Heading, Text, VStack } from '@chakra-ui/react'

export default function About (): ReactElement {
  return (
    <Container maxW={{ base: 'full', md: '80p' }}>
      <VStack alignItems='left' h='90vh' maxWidth='100%' px={10} py={10} spacing={5}>
        <Heading textAlign={{ base: 'center', md: 'left' }}>About</Heading>
        <Text>This online tool was created to help you organize your house cleaning tasks.</Text>
      </VStack>
    </Container>
  )
}
