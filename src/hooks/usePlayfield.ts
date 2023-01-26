import { useCallback } from 'react'
import { playfieldActions, selectCurrentFieldMap, selectGameStatus, selectFieldBuffer, selectPixelField, selectTimeCount } from '../features/playfield/playfieldSlice'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { GameStatus } from '../types/playfield'

export function usePlayfield() {
  const pixelField = useAppSelector(selectPixelField)
  const fieldBuffer = useAppSelector(selectFieldBuffer)
  const field = useAppSelector(selectCurrentFieldMap)
  const gameStatus = useAppSelector(selectGameStatus)
  const timeCount = useAppSelector(selectTimeCount)
  const dispatch = useAppDispatch()

  const initializeField = useCallback(() => {
    dispatch(playfieldActions.initializePlayfield())
  }, [dispatch])

  const changeGameStatus = useCallback((status: GameStatus) => {
    dispatch(playfieldActions.changeGameStatus({ status }))
  }, [dispatch])

  const reduceTime = useCallback((amount: number) => {
    dispatch(playfieldActions.reduceTime({ amount }))
  }, [dispatch])

  const resetTimerMs = useCallback(() => {
    dispatch(playfieldActions.resetTimerMs())
  }, [dispatch])

  return {
    // state
    timeCount,
    field,
    fieldBuffer,
    pixelField,

    // actions
    initializeField,
    gameStatus,
    changeGameStatus,
    reduceTime,
    resetTimerMs
  }
}
