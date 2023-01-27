import { Flex, Box, Text } from '@chakra-ui/react'
import { PageLayout } from "../components/PageLayout";
import { PixelFieldDisplay } from '../components/PixelFieldDisplay';
import { usePlayfield } from '../hooks/usePlayfield';

export function GamePage() {
  const { level, score, gameStatus, pixelField, timeCount } = usePlayfield()
  // TODO - show time left, score, line left, level, next block

  return (
    <PageLayout>
      <Flex>
        <PixelFieldDisplay pixelField={pixelField} />
        <Box bg='gray'>
          <Text>Time count: {timeCount}</Text>
          <Text>Game status: {gameStatus}</Text>
          <Text>Level: {level}</Text>
          <Text>Score: {score}</Text>
        </Box>
      </Flex>
    </PageLayout>
  )
}
