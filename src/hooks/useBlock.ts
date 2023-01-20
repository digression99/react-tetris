import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { actions, selectBlockHistory, selectCurrentBlock, selectNextBlock } from '../features/block/blockSlice'
import { BlockRotation, Position } from '../types/block'
import { FieldBitMap } from '../types/playfield'
import { isBlockInBoundary, rotateBlock } from '../utils/block'

export function useBlock() {
  const dispatch = useAppDispatch()
  const currentBlock = useAppSelector(selectCurrentBlock)
  const nextBlock = useAppSelector(selectNextBlock)
  const blockHistory = useAppSelector(selectBlockHistory)

  useEffect(() => {
    dispatch(actions.initializeBlock())
  }, [dispatch])

  const spawnNextBlock = () => dispatch(actions.spawnNextBlock())

  const changeBlockPosition = (requestedPosition: Position, field: FieldBitMap) => {
    // TODO - define the logic inside the reducer, not in the hook.
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

    dispatch(actions.changePosition({ position: requestedPosition }))
    return {
      original: { ...currentBlock.position },
      requested: requestedPosition,
      result: true
    }
  }

  const rotateCurrentBlock = (rotation: BlockRotation, field: FieldBitMap) => {
    // TODO - define the logic inside the reducer, not in the hook.
    if (!field || !currentBlock) return { requested: rotation, original: 0, result: false }

    const rotatedBlock = rotateBlock(currentBlock, rotation)
    if (!isBlockInBoundary(rotatedBlock.position, rotatedBlock, field)) {
      return { requested: rotation, original: currentBlock.rot, result: false }
    }

    dispatch(actions.rotateCurrentBlock({ rotation }))
    return { requested: rotation, original: currentBlock.rot, result: true }
  }

  return {
    // states.
    blockHistory,
    currentBlock,
    nextBlock,

    // actions.
    changeBlockPosition,
    spawnNextBlock,
    rotateCurrentBlock,
  }
}

