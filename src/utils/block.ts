import _ from 'lodash'
import { BLOCK_BITMAPS, ROTATION_COUNT, TETRINOMIO_COLORS } from "../constants/block"
import { PLAYFIELD_PADDING } from "../constants/playfield"
import { Block, BlockRotation, BlockType, Position, RotationEnum } from "../types/block"
import { FieldBitMap } from "../types/playfield"

export function isBlockInBoundary(nextPos: Position, block: Block | undefined, field: FieldBitMap) {
  if (!block) return false
  const blockBitMap = getBlockBitMap(block)
  const l = blockBitMap.length
  const w = blockBitMap[0].length
  const { x: nextX, y: nextY } = nextPos

  let isPixelInBoundary = true

  const newField = field.map(row => [...row])

  for (let i = 0; i < l; ++i) {
    for (let j = 0; j < w; ++j) {
      if (blockBitMap[i][j] === 1 && newField[i + nextY][j + nextX] === 1) {
        isPixelInBoundary = false
      }
    }
  }

  return isPixelInBoundary
}

export function getBlockBitMap(block: Block) {
  const { rot, blockType } = block
  return BLOCK_BITMAPS[blockType][rot]
}

// https://tetris.fandom.com/wiki/Random_Generator 
// 7 tetrinomios in a bag.
function generateRandomTetrinomioBag(): BlockType[] {
  return _.shuffle(['i', 'o', 's', 'z', 'j', 'l', 't'] as BlockType[])
}

export function generateRandomBlockBag(): Block[] {
  const randomTetrinomioBag = generateRandomTetrinomioBag()

  return randomTetrinomioBag.map(blockType => ({
    blockType,
    rot: 0,
    color: TETRINOMIO_COLORS[blockType],
    position: { x: PLAYFIELD_PADDING + 3, y: 0 }, // TODO - in the middle.
    isMerged: false
  }))
}

export function rotateBlock(block: Block, direction: BlockRotation): Block {
  return {
    ...block,
    rot:
      (direction === 'clockwise'
        ? (block.rot + 1) % ROTATION_COUNT
        : (block.rot + ROTATION_COUNT - 1) % ROTATION_COUNT) as RotationEnum
  }
}

