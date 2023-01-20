import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { FieldBitMap, PixelField } from '../../types/playfield'
import { createPixelField, drawBlockToFieldBitMap, drawBlockToPixelField, getFieldBitMap, removeFullLines } from '../../utils/playfield'

export interface PlayfieldState {
  pixelField: PixelField
  fieldBuffer: FieldBitMap // for merged blocks.
  gameStatus: 'pending' | 'started' | 'done'
  gravity: number // if the gravity changes, the dropping speed changes.
}

const initialPixelField = createPixelField()

export const initialState: PlayfieldState = {
  pixelField: initialPixelField,
  fieldBuffer: getFieldBitMap(initialPixelField), // for merged blocks.
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
      state.pixelField = createPixelField()
      state.fieldBuffer = getFieldBitMap(state.pixelField)
    },
    // NOTE - check if we could remove this action.
    // how can we trigger this, when currentBlock.y is at the bottom, or
    // collided with other blocks?
    mergeBlock: (state, action) => {
      const { block } = action.payload
      const { fieldBuffer } = state

      // TODO - sync up with pixelField.
      // state.fieldBuffer should be extracted from the pixelField.
      // state.fieldBuffer should be used only in the case of checking collision and line check.
      state.fieldBuffer = removeFullLines(drawBlockToFieldBitMap(block, fieldBuffer))
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

export const selectFieldBuffer = (state: RootState) => {
  return state.playfield.fieldBuffer
}

export const selectPixelField = (state: RootState) => {
  const currentBlock = state.block.currentBlock
  if (!currentBlock) return

  return drawBlockToPixelField(currentBlock, state.playfield.pixelField)
}

export default playfieldSlice.reducer;
