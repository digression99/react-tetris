import { Box, Button } from '@chakra-ui/react'
import { useBlock } from '../hooks/useBlock'
import { useCountTime } from '../hooks/base/useCountTime'
import { usePlayfield } from '../hooks/usePlayfield'
import { useGameController } from '../hooks/useGameController'
import { useEffect } from 'react'

export function Playfield() {
  const { initializeField, changeGameStatus, gameStatus, fieldBuffer, field } = usePlayfield()
  const { initializeBlock, currentBlock, changeBlockPosition } = useBlock()

  useGameController()

  const { start, stop } = useCountTime((t: number) => {
    if (!field || !currentBlock) return

    changeBlockPosition({
      ...currentBlock.position,
      y: currentBlock.position.y + 1
    })
  }, [fieldBuffer, currentBlock])

  useEffect(() => {
    if (gameStatus === 'init') {
      initializeField()
      initializeBlock()
      changeGameStatus('pending')
      console.log('game is pending..')
    } else if (gameStatus === 'done') {
      console.log('Game Over.')
      stop()
    } else if (gameStatus === 'started') {
      console.log('start called.')
      start()
    }
    // TODO - show score page, start again page.
  }, [start, stop, changeGameStatus, gameStatus, initializeField, initializeBlock])

  const onStart = () => {
    if (!currentBlock) return
    changeGameStatus('started')
  }

  const onReset = () => {
    changeGameStatus('init')
  }

  return (
    <div>
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
