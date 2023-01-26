import { configureStore, ThunkAction, Action, AnyAction, Dispatch } from '@reduxjs/toolkit';
import blockReducer, { BlockState } from '../features/block/blockSlice'
import playfieldReducer, { PlayfieldState } from '../features/playfield/playfieldSlice'
import blockListener from '../features/block/blockListener'

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
    return getDefaultMiddleware().prepend(blockListener.middleware)
  }
});

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


