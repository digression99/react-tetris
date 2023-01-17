import React from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { actions, selectCurrentBlock } from '../features/block/blockSlice'

export const TestComponent = (props: {}) => {
  const currentBlock = useAppSelector(selectCurrentBlock)
  const dispatch = useAppDispatch()

  console.log('[TestComponent] current block :', currentBlock)

  const onClick = () => {
    dispatch(actions.changePosition({ x: 0, y: 0 }))
  }

  return (
    <div>
      This is test component.
      <button onClick={onClick}>test!</button>
    </div>
  )
}
