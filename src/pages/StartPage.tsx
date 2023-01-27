import { Text, Box, Flex, Button, Heading } from '@chakra-ui/react'
import { PageLayout } from '../components/PageLayout'
import { usePlayfield } from '../hooks/usePlayfield'

export function StartPage() {
  const { changeGameStatus } = usePlayfield()

  const onStart = () => {
    changeGameStatus('started')
  }

  return (
    <PageLayout>
      <Flex h='100%' justifyContent='center' alignItems='center' direction='column'>
        <Heading>Reactris</Heading>

        <Box mt='8'>
          <Button
            onClick={onStart}
            size='lg' colorScheme='red'>Start</Button>
        </Box>
      </Flex>
    </PageLayout>
  )
}
