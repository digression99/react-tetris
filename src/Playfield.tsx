import { useEffect, useState } from 'react'
import { BLOCK_I, PLAYFIELD_MAP, PLAYFIELD_PADDING } from './constants'
import { useCountTime } from './hooks/useCountTime'
import { useKeyboard } from './hooks/useKeyboard'
import { BlockPosition } from './types'
import { calculatePosition, drawBlock } from './utils/playfield'

export function Playfield() {
  const [field, setField] = useState<number[][] | undefined>(undefined)
  // I think padding should be hidden from Playfield for moving.
  const [blockPosition, setBlockPosition] = useState({ x: PLAYFIELD_PADDING, y: 0 })
  const { time } = useCountTime()

  useKeyboard((key: string) => {
    setBlockPosition((pos: BlockPosition) => calculatePosition(pos, key))
  })

  useEffect(() => {
    console.log('new block position :', blockPosition)
    const newField = drawBlock(BLOCK_I, PLAYFIELD_MAP, blockPosition)
    console.log('initial new field :', newField)
    setField(newField)
  }, [blockPosition])

  return (
    <div>
      {
        field &&
        field.map((row, rowIndex) => {
          return (
            <div key={rowIndex}>
              {row.map((block, blockIndex) => {
                if (block === 0) {
                  return <span key={`${rowIndex}-${blockIndex}-o`}>o </span>
                }
                return <span key={`${rowIndex}-${blockIndex}-x`}>x </span>
              })}
            </div>
          )
        })
      }
    </div>
  )
}
