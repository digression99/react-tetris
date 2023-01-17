import { useKeyboard } from './base/useKeyboard'
import { usePlayfield } from './usePlayfield'
import { useBlock } from './useBlock'
import { calculatePosition } from '../utils/playfield'

export function useGameController() {
  const { field, mergeBlock, fieldBuffer } = usePlayfield()
  const { currentBlock, rotateCurrentBlock, changeBlockPosition } = useBlock()

  useKeyboard((key: string) => {
    if (!field || !currentBlock) return
    switch (key) {
      // case 'w': {
      //   // Hard drop.
      //   break
      // }

      case 'j': {
        // TODO - should check if the rotation fails.
        rotateCurrentBlock('c-clockwise', fieldBuffer)
        break
      }

      case 'k': {
        // TODO - should check if the rotation fails.
        rotateCurrentBlock('clockwise', fieldBuffer)
        break
      }
      case 'a':
      case 's':
      case 'd': {
        const returnedPosition = calculatePosition(currentBlock.position, key)
        const { result } = changeBlockPosition(returnedPosition, fieldBuffer)

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
