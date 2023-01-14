import { useState } from 'react'
import { BLOCK_I, PLAYFIELD_MAP, PLAYFIELD_PADDING } from './constants'
import { useCountTime } from './hooks/useCountTime'
import { useKeyboard } from './hooks/useKeyboard'
import { BlockBitMap, Position, FieldBitMap } from './types'
import { isBlockInBoundary } from './utils/block'
import { calculatePosition, drawBlock, mergeBlock } from './utils/playfield'

const initialPosition = { x: PLAYFIELD_PADDING, y: 0 }

function usePosition(block: BlockBitMap) {
  const [blockPosition, setPosition] = useState(initialPosition)

  const changePosition = (requestedPosition: Position, field: FieldBitMap) => {
    if (!isBlockInBoundary(requestedPosition, blockPosition, block, field)) {
      return {
        original: { ...blockPosition },
        requested: requestedPosition,
        result: false
      }
    }
    setPosition(requestedPosition)
    return { original: { ...blockPosition }, requested: requestedPosition, result: true }
  }

  return {
    blockPosition,
    changePosition
  }
}

export function Playfield() {
  const [field, setField] = useState<FieldBitMap | undefined>(undefined)
  const { blockPosition, changePosition } = usePosition(BLOCK_I)

  const { time, start } = useCountTime((t: number) => {
    if (!field) return
    const { result, original, requested } = changePosition({
      ...blockPosition,
      y: blockPosition.y + 1
    }, field)

    console.log('original, requested', original, requested, result)
    if (!result) {
      setField(mergeBlock(field, BLOCK_I, blockPosition))
      changePosition(initialPosition, field)
      return
    }

    // TODO - update drawing the field to reactive way.
    setField(drawBlock(BLOCK_I, field, requested, original))
  }, [field, blockPosition])

  useKeyboard((key: string) => {
    if (!field) return
    const returnedPosition = calculatePosition(blockPosition, key)
    const { result, original, requested } = changePosition(returnedPosition, field)

    if (result) {
      setField(drawBlock(BLOCK_I, field, requested, original))
      return
    }

    if (key === 's') {
      setField(mergeBlock(field, BLOCK_I, blockPosition))
      changePosition(initialPosition, field)
    }
  })

  const onStart = () => {
    setField(drawBlock(BLOCK_I, PLAYFIELD_MAP, blockPosition, blockPosition))
    start()
  }

  return (
    <div>
      <button onClick={onStart}>Start!</button>
      <pre>
        {
          field &&
          field.map((row, rowIndex) => {
            return (
              <div key={rowIndex} style={{ fontSize: '20px' }}>
                {row.map((block, blockIndex) => {
                  if (block === 0) {
                    return <span key={`${rowIndex}-${blockIndex}-o`} style={{ color: 'black', fontWeight: 'bold' }}>o </span>
                  }
                  return <span key={`${rowIndex}-${blockIndex}-x`} style={{ color: 'red' }}>x </span>
                })}
              </div>
            )
          })
        }
      </pre>
    </div>
  )
}
