import { PLAYFIELD_HEIGHT } from "../constants"
import { BlockBitMap, Position, FieldBitMap } from "../types"

export function drawBlock(block: number[][], field: number[][], pos: Position, prevPos: Position) {
  const { x, y } = pos
  const { x: prevX, y: prevY } = prevPos
  const h = block.length
  const w = block[0].length
  const newField = field.map(row => [...row])

  for (let i = 0; i < h; ++i) {
    for (let j = 0; j < w; ++j) {
      if (block[i][j] === 1) {
        newField[prevY + i][prevX + j] = 0
      }
    }
  }

  for (let i = 0; i < h; ++i) {
    for (let j = 0; j < w; ++j) {
      if (block[i][j] === 1) {
        newField[y + i][x + j] = 1
      }
    }
  }

  return newField
}

export const calculatePosition = (pos: Position, key: string) => {
  if (key === 'w') {
    // TODO - rotation.
    return pos
  } else if (key === 's') {
    return { ...pos, y: pos.y + 1 }
  } else if (key === 'a') {
    return { ...pos, x: pos.x - 1 }
  } else if (key === 'd') {
    return { ...pos, x: pos.x + 1 }
  } else if (key === ' ') {
    return { ...pos, y: PLAYFIELD_HEIGHT - 1 }
  }
  return pos
}

export function mergeBlock(field: FieldBitMap, block: BlockBitMap, blockPosition: Position) {
  const l = block.length
  const w = block[0].length
  const newField = field.map(row => [...row])

  for (let i = 0; i < l; ++i) {
    for (let j = 0; j < w; ++j) { if (block[i][j] === 1) newField[blockPosition.y + i][blockPosition.x + j] = 1 }
  }

  return newField
}
