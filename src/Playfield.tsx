import { useBlock } from './hooks/useBlock'
import { useCountTime } from './hooks/useCountTime'
import { useKeyboard } from './hooks/useKeyboard'
import { usePlayfield } from './hooks/usePlayfield'
import { calculatePosition } from './utils/playfield'

export function Playfield() {
  // const [field, setField] = useState<FieldBitMap | undefined>(undefined)
  const { mergeBlock, field, drawBlock } = usePlayfield()
  const { currentBlock, changeBlockPosition } = useBlock()

  const { start } = useCountTime((t: number) => {
    console.log('[useCountTime.method] field, currentBlock :', field, currentBlock)
    if (!field || !currentBlock) return

    const { result } = changeBlockPosition({
      ...currentBlock.position,
      y: currentBlock.position.y + 1
    }, field)

    if (!result) {
      mergeBlock()
      drawBlock()
      // setField(mergeBlock(field, currentBlock, blockPosition))
      // changeBlockPosition(currentBlock.position, field)
      return
    }

    // TODO - update drawing the field to reactive way.
    // setField(drawBlock(currentBlock, field, requested, original))
  }, [field])

  useKeyboard((key: string) => {
    if (!field || !currentBlock) return
    const returnedPosition = calculatePosition(currentBlock.position, key)
    const { result } = changeBlockPosition(returnedPosition, field)

    // if (result) {
    //   setField(drawBlock(currentBlock, field, requested, original))
    //   return
    // }

    if (key === 's' && !result) {
      mergeBlock()
      // mergeBlock(field, currentBlock)
      // getNextBlock()
      // the field should be drawn when 

      // setField()
      // setField(mergeBlock(field, currentBlock))
      // setField(drawBlock(nextBlock, field, ))
      // TODO - after merged, the block should position itself.
      // changeBlockPosition(currentBlock.position, field)
    }
  })

  const onStart = () => {
    console.log('[onStart] currentBlock', currentBlock)
    if (!currentBlock) return
    // setField(drawBlock(currentBlock, PLAYFIELD_MAP, blockPosition, blockPosition))
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
