import { Heading, Box, Button } from '@chakra-ui/react'
import { useBlock } from '../hooks/useBlock'
import { useCountTime } from '../hooks/base/useCountTime'
import { usePlayfield } from '../hooks/usePlayfield'
import { useGameController } from '../hooks/useGameController'
import { useEffectDebugger } from '../hooks/base/useEffectDebugger'

export function Playfield() {
  const { reduceTime, timeCount, initializeField, changeGameStatus, gameStatus, fieldBuffer, field } = usePlayfield()
  const { initializeBlock, currentBlock } = useBlock()

  useGameController()

  const { start, stop } = useCountTime((t: number) => {
    if (!field || !currentBlock) return
    reduceTime(50)
  }, 50, [fieldBuffer, currentBlock])

  useEffectDebugger(() => {
    // NOTE - this effect is called numerously, 
    // since deps include start, stop.
    if (gameStatus === 'init') {
      initializeField()
      initializeBlock()
      changeGameStatus('pending')
    } else if (gameStatus === 'done') {
      stop()
    } else if (gameStatus === 'started') {
      start()
    }
    // TODO - show score page, start again page.
  }, [changeGameStatus, gameStatus, initializeBlock, initializeField, start, stop],
    ['changeGameStatus', 'gameStatus', 'initializeBlock', 'initializeField', 'start', 'stop'])

  const onStart = () => {
    if (!currentBlock) return
    changeGameStatus('started')
  }

  const onReset = () => {
    changeGameStatus('init')
  }

  return (
    <div>
      <Heading>{timeCount}</Heading>

      {gameStatus === 'pending' && (
        <Button onClick={onStart}>Start!</Button>
      )}

      {gameStatus === 'done' && (
        <Box>
          <Button onClick={onReset}>Play again</Button>
        </Box>
      )}
    </div>
  )
}
