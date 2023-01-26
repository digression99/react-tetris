import { playfieldActions, selectCurrentFieldMap, selectGameStatus, selectFieldBuffer, selectPixelField } from '../features/playfield/playfieldSlice'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { GameStatus } from '../types/playfield'

export function usePlayfield() {
  const pixelField = useAppSelector(selectPixelField)
  const fieldBuffer = useAppSelector(selectFieldBuffer)
  const field = useAppSelector(selectCurrentFieldMap)
  const gameStatus = useAppSelector(selectGameStatus)
  const dispatch = useAppDispatch()

  const initializeField = () => {
    dispatch(playfieldActions.initializePlayfield())
  }

  const changeGameStatus = (status: GameStatus) => {
    dispatch(playfieldActions.changeGameStatus({ status }))
  }

  return { field, fieldBuffer, pixelField, initializeField, gameStatus, changeGameStatus }
}
