import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Block } from '../../types';
import { generateRandomBlockBag, rotateBlock } from '../../utils/block';

export interface BlockState {
  currentBlock?: Block;
  nextBlock?: Block;
  blockBag?: Block[];
  blockHistory: Block[];
}

const initialState: BlockState = {
  currentBlock: undefined,
  nextBlock: undefined,
  blockBag: undefined,
  blockHistory: []
}

export const blockSlice = createSlice({
  name: 'block',
  initialState,
  reducers: {
    initializeBlock: (state) => {
      const [current, ...bag] = generateRandomBlockBag()
      state.currentBlock = current
      state.nextBlock = bag[0]
      state.blockBag = bag
    },

    spawnNextBlock: (state) => {
      const { currentBlock, nextBlock, blockBag } = state

      if (!currentBlock || !blockBag) return

      state.blockHistory.push(currentBlock)
      state.currentBlock = nextBlock
      state.nextBlock = blockBag.splice(0, 1)[0]

      if (blockBag.length === 0) {
        state.blockBag = generateRandomBlockBag()
      }
    },

    changePosition: (state, action) => {
      const { position } = action.payload
      const { currentBlock } = state

      if (!currentBlock) return

      state.currentBlock = {
        ...currentBlock,
        position
      }
    },

    rotateCurrentBlock: (state, action) => {
      const { rotation } = action.payload
      const { currentBlock } = state
      if (!currentBlock) return
      state.currentBlock = rotateBlock(currentBlock, rotation)
    }
  }
})

export const actions = blockSlice.actions;

export const selectCurrentBlock = (state: RootState) => state.block.currentBlock;
export const selectNextBlock = (state: RootState) => state.block.nextBlock;
export const selectBlockHistory = (state: RootState) => state.block.blockHistory;

export default blockSlice.reducer;
