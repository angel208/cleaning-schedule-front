import { Box, HStack, SkeletonText, VStack } from '@chakra-ui/react'
import React from 'react'

export default function Loading() {
    return ( 
        <VStack spacing='16px' w="full" mx="20px">
            <Box padding='6' boxShadow='lg' bg='white' w='full'>
                <SkeletonText mt='4' noOfLines={3} spacing='4' />
            </Box>
            <Box padding='6' boxShadow='lg' bg='white'  w='full'>
                <SkeletonText mt='4' noOfLines={3} spacing='4' />
            </Box>
            <Box padding='6' boxShadow='lg' bg='white'  w='full'>
                <SkeletonText mt='4' noOfLines={3} spacing='4' />
            </Box>
            <Box padding='6' boxShadow='lg' bg='white'  w='full'>
                <SkeletonText mt='4' noOfLines={3} spacing='4' />
            </Box>
        </VStack>

    )
};