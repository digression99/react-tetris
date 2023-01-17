import { useKeyboard } from './base/useKeyboard'
import { usePlayfield } from './usePlayfield'
import { useBlock } from './useBlock'
import { calculatePosition } from '../utils/playfield'

export function useGameController() {
  const { field, mergeBlock } = usePlayfield()
  const { currentBlock, rotateCurrentBlock, changeBlockPosition } = useBlock()

  useKeyboard((key: string) => {
    if (!field || !currentBlock) return
    switch (key) {
      case 'w': {
        rotateCurrentBlock()
        break
      }
      case 'a':
      case 's':
      case 'd': {
        const returnedPosition = calculatePosition(currentBlock.position, key)
        const { result } = changeBlockPosition(returnedPosition, field)

        if (key === 's' && !result) {
          mergeBlock()
        }
        break
      }
      default:
        break
    }
  })
}
