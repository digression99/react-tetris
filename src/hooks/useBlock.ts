import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { actions, selectBlockHistory, selectCurrentBlock, selectNextBlock } from '../features/block/blockSlice'
import { FieldBitMap, Position } from '../types'
import { isBlockInBoundary } from '../utils/block'

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
    // NOTE - should we need to use "result"?
    // Could we check the collision/soft drop reactively to check if the block
    // is merged?
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

  const rotateCurrentBlock = () => dispatch(actions.rotateCurrentBlock())

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

