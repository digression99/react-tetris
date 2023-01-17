import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import blockReducer from '../features/block/blockSlice'
import playfieldReducer from '../features/playfield/playfieldSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    block: blockReducer,
    playfield: playfieldReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
