import { BlockBitMap, FieldBitMap, Position } from "../types"

export function isBlockInBoundary(nextPos: Position, pos: Position, block: BlockBitMap, field: FieldBitMap) {
  const l = block.length
  const w = block[0].length
  const { x, y } = pos
  const { x: nextX, y: nextY } = nextPos

  let isPixelInBoundary = true

  const newField = field.map(row => [...row])

  for (let i = 0; i < l; ++i) {
    for (let j = 0; j < w; ++j) {
      if (block[i][j] === 1) {
        newField[i + y][j + x] = 0
      }
    }
  }

  for (let i = 0; i < l; ++i) {
    for (let j = 0; j < w; ++j) {
      if (block[i][j] === 1 && newField[i + nextY][j + nextX] === 1) {
        isPixelInBoundary = false
      }
    }
  }

  return isPixelInBoundary
}

