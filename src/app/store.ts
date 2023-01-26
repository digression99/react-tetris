import { configureStore, ThunkAction, Action, AnyAction, Dispatch } from '@reduxjs/toolkit';
import blockReducer, { BlockState } from '../features/block/blockSlice'
import playfieldReducer, { PlayfieldState } from '../features/playfield/playfieldSlice'
import blockListener from '../features/block/blockListener'
import playfieldListener from '../features/playfield/playfieldListener'

export type RootState = {
  block: BlockState,
  playfield: PlayfieldState
}

export type AppDispatch = Dispatch<AnyAction>

export const store = configureStore({
  reducer: {
    block: blockReducer,
    playfield: playfieldReducer
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .prepend(blockListener.middleware)
      .prepend(playfieldListener.middleware)
  }
});

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


