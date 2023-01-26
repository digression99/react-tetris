import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { blockActions, selectBlockHistory, selectCurrentBlock, selectNextBlock } from '../features/block/blockSlice'
import { selectFieldBuffer } from '../features/playfield/playfieldSlice'
import { BlockRotation, Position } from '../types/block'

export function useBlock() {
  const dispatch = useAppDispatch()
  const currentBlock = useAppSelector(selectCurrentBlock)
  const nextBlock = useAppSelector(selectNextBlock)
  const blockHistory = useAppSelector(selectBlockHistory)
  const fieldBuffer = useAppSelector(selectFieldBuffer)

  const changeBlockPosition = (requestedPosition: Position, isMerged: boolean = false) => {
    dispatch(blockActions.changePosition({ position: requestedPosition, field: fieldBuffer, isMerged }))
  }

  const rotateCurrentBlock = (rotation: BlockRotation) => {
    if (!fieldBuffer || !currentBlock) return
    dispatch(blockActions.rotateCurrentBlock({ rotation, field: fieldBuffer }))
  }

  const initializeBlock = () => {
    dispatch(blockActions.initializeBlock())
  }

  return {
    // states.
    blockHistory,
    currentBlock,
    nextBlock,

    // actions.
    changeBlockPosition,
    rotateCurrentBlock,
    initializeBlock,
  }
}

