import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { FieldBitMap, GameStatus, PixelField } from '../../types/playfield'
import { drawBlockToFieldBitMap } from '../../utils/playfield'
import { createPixelField, detectFullLinesFromPixelField, drawBlockToPixelField, getFieldBitMap, removeFullLinesFromPixelField } from '../../utils/pixelField'
import { calculateScore } from '../../utils/score'

const INIT_TIMER_MS = 1000
const INIT_TIME_COUNT = 60

export interface PlayfieldState {
  timeCount: number
  timerMs: number
  pixelField: PixelField
  fieldBuffer: FieldBitMap // for merged blocks.
  gameStatus: GameStatus
  score: number
  linesLeft: number
  level: number // if the level changes, the dropping speed changes. 
}

const initialPixelField = createPixelField()

export const initialState: PlayfieldState = {
  timerMs: INIT_TIMER_MS,
  timeCount: INIT_TIME_COUNT, // 60 seconds.
  pixelField: initialPixelField,
  fieldBuffer: getFieldBitMap(initialPixelField), // for merged blocks.
  gameStatus: 'init',
  score: 0,
  linesLeft: 10,
  level: 1
}

const playfieldSlice = createSlice({
  name: 'playfield',
  initialState,
  reducers: {
    initializePlayfield: (state) => {
      state.pixelField = createPixelField()
      state.fieldBuffer = getFieldBitMap(state.pixelField)
      state.gameStatus = 'init'
      state.timerMs = INIT_TIMER_MS
      state.timeCount = INIT_TIME_COUNT
      state.level = 1
      state.score = 0
      state.linesLeft = 10
    },

    mergeBlock: (state, action) => {
      const { block } = action.payload
      const { pixelField, level } = state

      const tempPixelField = drawBlockToPixelField(block, pixelField)
      const removedLinesCount = detectFullLinesFromPixelField(tempPixelField)

      state.score += calculateScore(removedLinesCount, level)
      state.pixelField = removeFullLinesFromPixelField(tempPixelField)
      state.fieldBuffer = getFieldBitMap(state.pixelField)
    },

    changeGameStatus: (state, action) => {
      const { status } = action.payload
      state.gameStatus = status
    },

    resetTimerMs: (state) => {
      state.timerMs = INIT_TIMER_MS
    },

    reduceTime: (state, action) => {
      const { amount } = action.payload
      state.timerMs -= amount
    },

    reduceTimerCount: (state) => {
      state.timeCount -= 1
    }
  }
})

export const playfieldActions = playfieldSlice.actions;

// compound selectors.
// This is the reactive version of "drawBlock"
export const selectCurrentFieldMap = (state: RootState) => {
  const currentBlock = state.block.currentBlock
  const fieldBuffer = state.playfield.fieldBuffer
  if (!currentBlock || !fieldBuffer) return undefined;
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

export const selectGameStatus = (state: RootState) => {
  return state.playfield.gameStatus
}

export const selectTimeCount = (state: RootState) => {
  return state.playfield.timeCount
}

export const selectScore = (state: RootState) => {
  return state.playfield.score
}

export const selectLinesLeft = (state: RootState) => {
  return state.playfield.linesLeft
}

export const selectLevel = (state: RootState) => {
  return state.playfield.level
}

export default playfieldSlice.reducer;
