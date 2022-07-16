import React from 'react'
import { Box } from '@chakra-ui/react'
import Link from 'next/link'
import { IconType } from 'react-icons';

interface SidebarButtonProps {
    Icon: IconType;
    route: string;
}

export default function SideBarButton( { Icon, route }: SidebarButtonProps ): JSX.Element {
    return (
        <Box _hover={ {transform:'scale(1.15)'}} transition='0.2s' >
            <Link href={route} ><a><Icon size={28}/></a></Link>
        </Box>
    )
}
