import { actions as playfieldActions, selectCurrentFieldMap, selectFieldBuffer, selectPixelField } from '../features/playfield/playfieldSlice'
import { useAppDispatch, useAppSelector } from '../app/hooks'

export function usePlayfield() {
  const pixelField = useAppSelector(selectPixelField)
  const fieldBuffer = useAppSelector(selectFieldBuffer)
  const field = useAppSelector(selectCurrentFieldMap)
  const dispatch = useAppDispatch()

  const initializeField = () => {
    dispatch(playfieldActions.initializePlayfield())
  }

  return { field, fieldBuffer, pixelField, initializeField }
}
