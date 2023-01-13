import { PLAYFIELD_HEIGHT, PLAYFIELD_PADDING, PLAYFIELD_WIDTH } from "../constants"
import { BlockBitMap, Position } from "../types"

export function getBlockDimension(blockBitMap: BlockBitMap) {
  const h = blockBitMap.length
  const w = blockBitMap[0].length

  let minWidth = w - 1,
    minHeight = h - 1,
    maxWidth = 0,
    maxHeight = 0

  for (let i = 0; i < h; ++i) {
    for (let j = 0; j < w; ++j) {
      // wow
      if (blockBitMap[i][j] === 1) {
        minWidth = Math.min(minWidth, j)
        maxWidth = Math.max(maxWidth, j)
        minHeight = Math.min(minHeight, i)
        maxHeight = Math.min(maxHeight, i)
      }
    }
  }

  return {
    width: maxWidth - minWidth + 1,
    height: maxHeight - minHeight + 1
  }
}

export function isBlockInBoundary(pos: Position, block: BlockBitMap) {
  // should check the entire block pixel, not just the dimension.
  const blockDimension = getBlockDimension(block)
  // should check the block height.
  const isYPosInBoundary = pos.y >= 0 && pos.y < PLAYFIELD_HEIGHT + blockDimension.height - 1
  // should check the block width.
  const isXPosInBoundary = pos.x >= PLAYFIELD_PADDING && pos.x < PLAYFIELD_WIDTH + PLAYFIELD_PADDING - blockDimension.width
  return isYPosInBoundary && isXPosInBoundary
}

// This can't be implemented, since we need to know the intended position is 
// already filled.
export function isPixelInBoundary(pixelPosition: Position) {
  // const isYPosInBoundary = //
  return false
}
