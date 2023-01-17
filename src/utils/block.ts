import { BLOCK_BITMAPS, ROTATION_COUNT, TETRINOMIO_COLORS } from "../constants/block"
import { PLAYFIELD_PADDING } from "../constants/playfield"
import { Block, BlockType, FieldBitMap, Position } from "../types"

export function isBlockInBoundary(nextPos: Position, block: Block | undefined, field: FieldBitMap) {
  if (!block) return false

  const blockBitMap = getBlockBitMap(block)
  const l = blockBitMap.length
  const w = blockBitMap[0].length
  const { x, y } = block.position
  const { x: nextX, y: nextY } = nextPos

  let isPixelInBoundary = true

  const newField = field.map(row => [...row])

  for (let i = 0; i < l; ++i) {
    for (let j = 0; j < w; ++j) {
      if (blockBitMap[i][j] === 1) {
        newField[i + y][j + x] = 0
      }
    }
  }

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
  // console.log('[getBlockBitMap] block :', block)
  const { rot, blockType } = block
  return BLOCK_BITMAPS[blockType][rot]
}

// https://tetris.fandom.com/wiki/Random_Generator 
// 7 tetrinomios in a bag.
function generateRandomTetrinomioBag(): BlockType[] {
  return (['i', 'o', 's', 'z', 'j', 'l', 't'] as BlockType[]).sort()
}

export function generateRandomBlockBag(): Block[] {
  const randomTetrinomioBag = generateRandomTetrinomioBag()

  return randomTetrinomioBag.map(blockType => ({
    blockType,
    rot: 0,
    color: TETRINOMIO_COLORS[blockType],
    position: { x: PLAYFIELD_PADDING, y: 0 },
    isMerged: false
  }))
}

export function rotateBlock(block: Block) {
  return { ...block, rot: block.rot + 1 % ROTATION_COUNT }
}
