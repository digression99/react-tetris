import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { createPlayfieldMap } from '../../constants/playfield'
import { FieldBitMap } from '../../types'
import { drawBlockToFieldBitMap, mergeBlockToFieldBitMap } from '../../utils/playfield'

export interface PlayfieldState {
  fieldBuffer: FieldBitMap,
  // field?: FieldBitMap
  gameStatus: 'pending' | 'started' | 'done',
  gravity: number // if the gravity changes, the dropping speed changes.
}

export const initialState: PlayfieldState = {
  fieldBuffer: createPlayfieldMap(), // for merged blocks.
  // field: undefined, // for active map.
  gameStatus: 'pending',
    gravity: 1
}

const playfieldSlice = createSlice({
  name: 'playfield',
  initialState,
  reducers: {
    initializePlayfield: (state) => {
      // TODO - when the game ends, initialize the field.
      state.fieldBuffer = createPlayfieldMap();
    },
    // NOTE - check if we could remove this action.
    // how can we trigger this, when currentBlock.y is at the bottom, or
    // collided with other blocks?
    mergeBlock: (state, action) => {
      const { block } = action.payload
      const { fieldBuffer } = state
      state.fieldBuffer = mergeBlockToFieldBitMap(fieldBuffer, block)
    }
  }
})

export const actions = playfieldSlice.actions;

// compound selectors.
// This is the reactive version of "drawBlock"
export const selectCurrentFieldMap = (state: RootState) => {
  const currentBlock = state.block.currentBlock
  const fieldBuffer = state.playfield.fieldBuffer
  if (!currentBlock || !fieldBuffer) return undefined;
  // TODO - check if the field map updates
  // after the block position changes.
  return drawBlockToFieldBitMap(currentBlock, fieldBuffer)
}

export default playfieldSlice.reducer;
