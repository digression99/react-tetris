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
    if (!isBlockInBoundary(currentBlock.position, currentBlock, fieldBuffer)) {
      listenerApi.dispatch(playfieldActions.changeGameStatus({ status: 'done' }))
      listenerApi.dispatch(playfieldActions.resetTimerMs())
    }
  }
})

listenerMiddleware.startListening({
  actionCreator: playfieldActions.reduceTime,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState()
    const { timerMs, timeCount } = state.playfield

    if (timeCount <= 0) {
      listenerApi.dispatch(playfieldActions.changeGameStatus({ status: 'done' }))
      return
    }

    if (timerMs <= 0) {
      listenerApi.dispatch(playfieldActions.reduceTimerCount())
      listenerApi.dispatch(playfieldActions.resetTimerMs())
    }
  }
})

export default listenerMiddleware


