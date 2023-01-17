import { PLAYFIELD_HEIGHT } from "../constants/playfield"
import { Position, FieldBitMap, Block } from "../types"
import { getBlockBitMap } from "./block"

export function drawBlockToFieldBitMap(block: Block, field: FieldBitMap) {
  // console.log('[drawBlockToFieldBitMap]block', block)
  const { x, y } = block.position
  const blockBitMap = getBlockBitMap(block)
  const h = blockBitMap.length
  const w = blockBitMap[0].length
  const newField = field.map(row => [...row])

  for (let i = 0; i < h; ++i) {
    for (let j = 0; j < w; ++j) {
      if (blockBitMap[i][j] === 1) {
        newField[y + i][x + j] = 1
      }
    }
  }

  return newField
}

export const calculatePosition = (pos: Position, key: string) => {
    if (key === 's') {
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

export function mergeBlockToFieldBitMap(field: FieldBitMap, block: Block) {
  const blockBitMap = getBlockBitMap(block)
  const l = blockBitMap.length
  const w = blockBitMap[0].length
  const newField = field.map(row => [...row])

  for (let i = 0; i < l; ++i) {
    for (let j = 0; j < w; ++j) {
      if (blockBitMap[i][j] === 1) newField[block.position.y + i][block.position.x + j] = 1
    }
  }

  return newField
}
