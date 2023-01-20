// @deprecated
import {
  PLAYFIELD_HEIGHT,
  PLAYFIELD_NORMAL_ROW,
  PLAYFIELD_PADDING,
} from "../constants/playfield"
import { Position, Block } from "../types/block"
import { FieldBitMap } from "../types/playfield"
import { getBlockBitMap } from "./block"


// NOTE - all functions return the new object(deep copy).

export function drawBlockToFieldBitMap(block: Block, field: FieldBitMap) {
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

export function removeFullLines(field: FieldBitMap): FieldBitMap {
  const l = field.length
  const newField = field.map(row => [...row])
  newField.reverse()

  for (let i = PLAYFIELD_PADDING; i < l; ++i) {
    const isFullLine = newField[i].every(pixel => pixel === 1)
    if (!isFullLine) continue
    newField.splice(i, 1)
    newField.push(PLAYFIELD_NORMAL_ROW)
    --i
  }

  newField.reverse()
  return newField
}

