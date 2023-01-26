import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Block } from '../../types/block';
import { generateRandomBlockBag, isBlockInBoundary, rotateBlock } from '../../utils/block';

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

const spawnNextBlockReducer = (state: BlockState) => {
  console.log('[spawnNextBlock] called.')
  const { currentBlock, nextBlock, blockBag } = state

  if (!currentBlock || !blockBag) return

  state.blockHistory.push(currentBlock)
  state.currentBlock = nextBlock
  state.nextBlock = blockBag.splice(0, 1)[0]

  if (blockBag.length === 0) {
    state.blockBag = generateRandomBlockBag()
  }
}

export const blockSlice = createSlice({
  name: 'block',
  initialState,
  reducers: {
    spawnNextBlock: spawnNextBlockReducer,
    initializeBlock: (state) => {
      const [current, ...bag] = generateRandomBlockBag()
      state.currentBlock = current
      state.nextBlock = bag[0]
      state.blockBag = bag
    },

    changePosition: (state, action) => {
      const { isMerged, position, field } = action.payload
      const { currentBlock } = state

      if (!currentBlock) return
      if (!isBlockInBoundary(position, currentBlock, field)) return

      state.currentBlock = {
        ...currentBlock,
        position,
        isMerged
      }
    },

    rotateCurrentBlock: (state, action) => {
      const { rotation, field } = action.payload
      const { currentBlock } = state
      if (!currentBlock) return
      const rotatedBlock = rotateBlock(currentBlock, rotation)
      if (!isBlockInBoundary(rotatedBlock.position, rotatedBlock, field)) return
      state.currentBlock = rotatedBlock
    },
  }
})

export const blockActions = blockSlice.actions;

export const selectCurrentBlock = (state: RootState) => state.block.currentBlock;
export const selectNextBlock = (state: RootState) => state.block.nextBlock;
export const selectBlockHistory = (state: RootState) => state.block.blockHistory;

export default blockSlice.reducer;
