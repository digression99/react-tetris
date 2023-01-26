import { createListenerMiddleware } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../../app/store'
import { playfieldActions } from '../../features/playfield/playfieldSlice'
import { blockActions } from './blockSlice'

const listenerMiddleware = createListenerMiddleware<RootState, AppDispatch>()

listenerMiddleware.startListening({
  actionCreator: blockActions.changePosition,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState()
    const { position, isMerged } = action.payload
    const { currentBlock } = state.block

    if (!currentBlock) return

    if (isMerged || position.y !== currentBlock.position.y) {
      listenerApi.dispatch(playfieldActions.mergeBlock({ block: currentBlock }))
      listenerApi.dispatch(blockActions.spawnNextBlock())
    }
  }
})

export default listenerMiddleware
