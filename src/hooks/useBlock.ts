import { useState, useEffect, useRef } from 'react'
import { Block, FieldBitMap, Position } from '../types'
import { generateRandomBlockBag, isBlockInBoundary } from '../utils/block'

// TODO
// - generate a block bag.
// - return the current block.
// - change the block position.
// - merge the block with the field.
// - save block history.
export function useBlock() {
  const [blockHistory, setBlockHistory] = useState<Block[]>([])
  const [blockBag, setBlockBag] = useState<Block[] | undefined>(undefined)
  const [currentBlock, setCurrentBlock] = useState<Block | undefined>(undefined)
  const [nextBlock, setNextBlock] = useState<Block | undefined>(undefined)

  useEffect(() => {
    if (blockBag) return
    const newBlockBag = generateRandomBlockBag()
    setCurrentBlock(newBlockBag[0])
    setBlockBag(newBlockBag.slice(1))
  }, [])

  const getNextBlock = () => {
    if (!blockBag) return
    const nextAnticipatedBlock = blockBag[0]
    let nextBlockBag = blockBag.slice(1)

    if (nextBlockBag.length === 0) {
      nextBlockBag = generateRandomBlockBag()
    }

    setCurrentBlock(nextAnticipatedBlock)
    setNextBlock(nextBlockBag[0])
    setBlockBag(nextBlockBag)
    // TODO - do not generate a new array.
    setBlockHistory(bh => [...bh, nextAnticipatedBlock])
    return nextAnticipatedBlock
  }

  const changeBlockPosition = (requestedPosition: Position, field: FieldBitMap) => {
    if (!currentBlock) return {
      original: requestedPosition,
      requested: requestedPosition,
      result: false
    }

    if (!isBlockInBoundary(requestedPosition, currentBlock, field)) {
      return {
        original: { ...currentBlock.position },
        requested: requestedPosition,
        result: false
      }
    }

    setCurrentBlock({ ...currentBlock, position: requestedPosition })

    return {
      original: { ...currentBlock.position },
      requested: requestedPosition,
      result: true
    }
  }

  return {
    changeBlockPosition,
    getNextBlock,
    currentBlock,
    nextBlock,
    blockHistory
  }
}

