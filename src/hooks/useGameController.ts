import { useKeyboard } from './base/useKeyboard'
import { usePlayfield } from './usePlayfield'
import { useBlock } from './useBlock'
import { calculatePosition } from '../utils/playfield'
import { hardDropBlock } from '../utils/pixelField'

export function useGameController() {
  const { pixelField, field, fieldBuffer } = usePlayfield()
  const { currentBlock, rotateCurrentBlock, changeBlockPosition } = useBlock()

  useKeyboard((key: string) => {
    if (!field || !currentBlock || !pixelField) return
    switch (key) {
      case 'w': {
        const droppedBlock = hardDropBlock(currentBlock, fieldBuffer)
        changeBlockPosition(droppedBlock.position, true)
        break
      }
      case 'j': {
        rotateCurrentBlock('c-clockwise')
        break
      }

      case 'k': {
        rotateCurrentBlock('clockwise')
        break
      }
      case 'a':
      case 's':
      case 'd': {
        const returnedPosition = calculatePosition(currentBlock.position, key)
        changeBlockPosition(returnedPosition)
        break
      }
      default:
        break
    }
  })
}
