import { Center, Container, ContainerProps } from '@chakra-ui/react'
import { ReactNode } from "react"

type Props = {
  children: ReactNode
} & ContainerProps

export function PageLayout({ children, ...props }: Props) {
  return (
    <Center bg='black' w='100%' minH='100vh'>
      <Container
        bg='white' // default bg color
        maxW='md'
        h='550px'
        overflow='hidden'
        {...props}
      >{children}</Container>
    </Center>
  )
}
