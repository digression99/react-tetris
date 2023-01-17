import { useBlock } from './useBlock'
import { actions as playfieldActions, selectCurrentFieldMap, selectFieldBuffer } from '../features/playfield/playfieldSlice'
import { useAppDispatch, useAppSelector } from '../app/hooks'

export function usePlayfield() {
  const fieldBuffer = useAppSelector(selectFieldBuffer)
  const field = useAppSelector(selectCurrentFieldMap)
  const dispatch = useAppDispatch()
  const { currentBlock, spawnNextBlock } = useBlock()

  const mergeBlock = () => {
    console.log('[usePlayfield.mergeBlock] called..')
    // NOTE - can we automatically detect if the block should be merged
    // only with the reactive data?
    // NOTE - could we ignore the order of this two actions? or
    // merge them into one action?
    dispatch(playfieldActions.mergeBlock({ block: currentBlock }))
    spawnNextBlock()
  }

  return { field, mergeBlock, fieldBuffer }
}
