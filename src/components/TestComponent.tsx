import React from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { blockActions, selectCurrentBlock } from '../features/block/blockSlice'

export const TestComponent = (props: {}) => {
  const currentBlock = useAppSelector(selectCurrentBlock)
  const dispatch = useAppDispatch()

  const onClick = () => {
    dispatch(blockActions.changePosition({ x: 0, y: 0 }))
  }

  return (
    <div>
      This is test component.
      <button onClick={onClick}>test!</button>
    </div>
  )
}
