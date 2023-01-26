import { createListenerMiddleware } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../app/store";
import { isBlockInBoundary } from "../../utils/block";
import { blockActions } from "../block/blockSlice";
import { playfieldActions } from "./playfieldSlice";

const listenerMiddleware = createListenerMiddleware<RootState, AppDispatch>()

listenerMiddleware.startListening({
  actionCreator: blockActions.spawnNextBlock,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState()
    const { currentBlock } = state.block
    const { fieldBuffer } = state.playfield

    if (!currentBlock) return
    console.log('[playfieldListener]', !isBlockInBoundary(currentBlock.position, currentBlock, fieldBuffer))

    if (!isBlockInBoundary(currentBlock.position, currentBlock, fieldBuffer)) {
      listenerApi.dispatch(playfieldActions.changeGameStatus({ status: 'done' }))
    }
  }
})

export default listenerMiddleware


