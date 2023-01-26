import { useCallback } from 'react'
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

  const changeBlockPosition = useCallback((requestedPosition: Position, isMerged: boolean = false) => {
    dispatch(blockActions.changePosition({ position: requestedPosition, field: fieldBuffer, isMerged }))
  }, [dispatch, fieldBuffer])

  const rotateCurrentBlock = useCallback((rotation: BlockRotation) => {
    if (!fieldBuffer || !currentBlock) return
    dispatch(blockActions.rotateCurrentBlock({ rotation, field: fieldBuffer }))
  }, [currentBlock, dispatch, fieldBuffer])

  const initializeBlock = useCallback(() => {
    dispatch(blockActions.initializeBlock())
  }, [dispatch])

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

