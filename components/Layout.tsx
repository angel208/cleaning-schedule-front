import React, { ReactElement } from 'react'
import Footer from './Footer/Footer'
import SideBar from './Sidebar/SideBar'
import { Container, Box } from '@chakra-ui/react'
import { LayoutProps } from '../types/props'

export default function Layout ({ children }: LayoutProps): ReactElement {
  return (
    <Box background='White'>
      <SideBar />

      <Container maxW='container.xl' h='fit-content' p={0}>
        <Box>
          {children}
        </Box>
        <Footer />
      </Container>
    </Box>
  )
}
