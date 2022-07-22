import {
  chakra,
  useColorModeValue,
  VisuallyHidden
} from '@chakra-ui/react'
import { ReactElement } from 'react'
import { SocialButtonProps } from '../../types/props'

export default function SocialButton ({ children, label, href }: SocialButtonProps): ReactElement {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded='full'
      w={8}
      h={8}
      cursor='pointer'
      as='a'
      href={href}
      display='inline-flex'
      alignItems='center'
      justifyContent='center'
      transition='background 0.3s ease'
      target='_blank'
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200')
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
};
