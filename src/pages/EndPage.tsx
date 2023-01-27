import { Text, Box, Flex, Button, Heading } from '@chakra-ui/react'
import { PageLayout } from '../components/PageLayout'
import { usePlayfield } from '../hooks/usePlayfield'

export function EndPage() {
  const { changeGameStatus, score, level } = usePlayfield()

  const onRetry = () => {
    changeGameStatus('init')
  }

  return (
    <PageLayout>
      <Flex h='100%' justifyContent='center' alignItems='center' direction='column'>
        <Box>
          <Heading>Score</Heading>
          <Text>{score}</Text>
        </Box>

        <Box>
          <Heading>Level</Heading>
          <Text>{level}</Text>
        </Box>

        <Box mt='8'>
          <Button
            onClick={onRetry}
            size='lg' colorScheme='red'>Try Again</Button>
        </Box>
      </Flex>
    </PageLayout>
  )


}
