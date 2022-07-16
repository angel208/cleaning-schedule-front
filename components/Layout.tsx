import React, { Component } from 'react'
import Footer from './Footer/Footer'
import SideBar from './Sidebar/SideBar'
import {Container, Box} from '@chakra-ui/react'

type LayoutProps = {
    children: React.ReactNode,
  };
  

export default function Layout({children}: LayoutProps) {
    return (
        <Box background={'White'}>
            <SideBar />

            <Container maxW='container.xl' h="fit-content" p={0}>
                <Box>
                    {children}
                </Box>
                <Footer/>
            </Container>
        </Box>
    )
}
