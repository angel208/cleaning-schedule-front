import React, { ReactElement } from 'react'
import { Box } from '@chakra-ui/react'
import Link from 'next/link'
import { SidebarButtonProps } from '../../types/props'

export default function SideBarButton ({ Icon, route }: SidebarButtonProps): ReactElement {
  return (
    <Box _hover={{ transform: 'scale(1.15)' }} transition='0.2s'>
      <Link href={route}><a><Icon size={28} /></a></Link>
    </Box>
  )
}
