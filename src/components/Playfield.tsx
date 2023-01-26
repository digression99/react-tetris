import { useBlock } from '../hooks/useBlock'
import { useCountTime } from '../hooks/base/useCountTime'
import { usePlayfield } from '../hooks/usePlayfield'
import { useGameController } from '../hooks/useGameController'

export function Playfield() {
  const { fieldBuffer, field } = usePlayfield()
  const { currentBlock, changeBlockPosition } = useBlock()

  useGameController()

  const { start } = useCountTime((t: number) => {
    if (!field || !currentBlock) return

    changeBlockPosition({
      ...currentBlock.position,
      y: currentBlock.position.y + 1
    })
  }, [fieldBuffer, currentBlock])


  const onStart = () => {
    if (!currentBlock) return
    start()
  }

  return (
    <div>
      <button onClick={onStart}>Start!</button>
    </div>
  )
}
