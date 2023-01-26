import { EMPTY_COLOR, PLAYFIELD_BOTTOM, PLAYFIELD_HEIGHT, PLAYFIELD_NORMAL_ROW, PLAYFIELD_PADDING, WALL_COLOR } from "../constants/playfield"
import _ from 'lodash'
import { Block, Position } from "../types/block"
import { FieldBitMap, Pixel, PixelField } from "../types/playfield"
import { getBlockBitMap } from "./block"

function createPixelFromBit(bit: 0 | 1): Pixel {
  return {
    bit,
    color: bit === 0 ? EMPTY_COLOR : WALL_COLOR,
    pixelType: 'normal'
  }
}

export function createPixelField(): PixelField {
  return [
    ...Array.from({
      length: PLAYFIELD_HEIGHT
    }).map(
      () =>
        PLAYFIELD_NORMAL_ROW.map(createPixelFromBit),
    ),
    PLAYFIELD_BOTTOM.map(createPixelFromBit),
    PLAYFIELD_BOTTOM.map(createPixelFromBit),
  ]
}

export function drawBlockToPixelField(block: Block, pixelField: PixelField) {
  const { x, y } = block.position
  const blockBitMap = getBlockBitMap(block)
  // NOTE - structuredClone copies the proxy, not the object
  // when used with immerjs.
  // That is why I used lodash.cloneDeep to copy the object.
  const newPixelField = _.cloneDeep(pixelField)
  const l = blockBitMap.length
  const w = blockBitMap[0].length

  for (let i = 0; i < l; ++i) {
    for (let j = 0; j < w; ++j) {
      if (blockBitMap[i][j] === 1) {
        newPixelField[y + i][x + j] = { color: block.color, bit: 1, pixelType: 'normal' }
      }
    }
  }

  return newPixelField
}

export function getFieldBitMap(pixelField: PixelField): FieldBitMap {
  return pixelField.map(pixelRow => pixelRow.map(pixel => pixel.bit))
}

// TODO - remove duplication from FieldBitMap
export function removeFullLinesFromPixelField(field: PixelField): PixelField {
  const l = field.length
  const newField = _.cloneDeep(field)

  newField.reverse()

  for (let i = PLAYFIELD_PADDING; i < l; ++i) {
    const isFullLine = newField[i].every(pixel => pixel.bit === 1)
    if (!isFullLine) continue
    newField.splice(i, 1)
    newField.push(
      PLAYFIELD_NORMAL_ROW.map(createPixelFromBit)
    )
    --i
  }

  newField.reverse()
  return newField
}

function calculateMinHeight(pixelPosition: Position, field: FieldBitMap): number {
  // NOTE - the valid playfield height is 22.
  const { x, y } = pixelPosition

  // FIXME - Bug exists here!
  // the difference between total bottom.
  let minHeight = 0
  for (let i = y + 1; i < PLAYFIELD_HEIGHT; ++i) {
    if (field[i][x] === 1) return minHeight
    minHeight++
  }
  return minHeight
}

// returns position updated block.
export function hardDropBlock(block: Block, fieldBitMap: FieldBitMap): Block {
  const { x, y } = block.position
  const blockBitMap = getBlockBitMap(block)
  const l = blockBitMap.length
  const w = blockBitMap[0].length

  let minHeight = PLAYFIELD_HEIGHT - y

  for (let i = 0; i < l; ++i) {
    for (let j = 0; j < w; ++j) {
      if (blockBitMap[i][j] === 1) {
        const pixelPosition = { x: x + j, y: y + i }
        const calculatedMinHeight = calculateMinHeight(pixelPosition, fieldBitMap)
        minHeight = Math.min(minHeight, calculatedMinHeight)
        // NOTE - minHeight is calculated, not considering the merged field.
      }
    }
  }

  return {
    ...block,
    position: { x, y: y + minHeight }
  }
}



