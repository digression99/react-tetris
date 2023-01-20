import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { FieldBitMap, PixelField } from '../../types/playfield'
import { drawBlockToFieldBitMap } from '../../utils/playfield'
import { createPixelField, drawBlockToPixelField, getFieldBitMap, removeFullLinesFromPixelField } from '../../utils/pixelField'

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
      const { pixelField } = state
      console.log('[mergeBlock], block', block)
      state.pixelField = removeFullLinesFromPixelField(
        drawBlockToPixelField(block, pixelField)
      )
      state.fieldBuffer = getFieldBitMap(state.pixelField)
    },

    // hardDropBlock: (state, action) => {
    //   const { block } = action.payload
    //   const { pixelField } = state
    //   const droppedBlock = hardDropBlock(block, pixelField)
    //   state.pixelField = drawBlockToPixelField(droppedBlock, pixelField)
    //   state.fieldBuffer = getFieldBitMap(state.pixelField)
    // }
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
