import { PLAYFIELD_HEIGHT, PLAYFIELD_PADDING, PLAYFIELD_WIDTH } from "../constants"
import { BlockPosition } from "../types"

export function drawBlock(block: number[][], field: number[][], pos: { x: number, y: number }) {
  const { x, y } = pos

  const h = block.length
  const l = block[0].length
  const newField = field.map(row => row.slice())

  for (let i = 0; i < h; ++i) {
    for (let j = 0; j < l; ++j) {
      if (block[i][j] === 1)
        newField[y + i][x + j] = 1
    }
  }

  return newField
}

export const calculatePosition = (pos: BlockPosition, key: string) => {
  if (key === 'w') {
    return { ...pos, y: Math.max(0, pos.y - 1) }
    // up
  } else if (key === 's') {
    // - 2 : Shouldn't encounter the bottom.
    return { ...pos, y: Math.min(PLAYFIELD_HEIGHT - 2, pos.y + 1) }
    // down
  } else if (key === 'a') {
    return { ...pos, x: Math.max(PLAYFIELD_PADDING, pos.x - 1) }
    // left
  } else if (key === 'd') {
    // add block width
    const BLOCK_WIDTH = 4
    return { ...pos, x: Math.min(PLAYFIELD_WIDTH + PLAYFIELD_PADDING - BLOCK_WIDTH, pos.x + 1) }
    // right
  } else if (key === ' ') {
    // space
    // hard drop
    return { ...pos, y: PLAYFIELD_HEIGHT - 1 }
  }
  return pos
}
