import { useBlock } from './hooks/useBlock'
import { useCountTime } from './hooks/useCountTime'
import { useKeyboard } from './hooks/useKeyboard'
import { usePlayfield } from './hooks/usePlayfield'
import { calculatePosition } from './utils/playfield'

export function Playfield() {
  const { mergeBlock, field } = usePlayfield()
  const { currentBlock, changeBlockPosition } = useBlock()

  const { start } = useCountTime((t: number) => {
    if (!field || !currentBlock) return

      console.log('[useCountTime] calling....')

    const { result } = changeBlockPosition({
      ...currentBlock.position,
      y: currentBlock.position.y + 1
    }, field)

    // BUG - even if we call "changeBlockPosition", it doesn't change the block's position.
    if (!result) {
      mergeBlock()
    }
  }, [field, currentBlock])

  useKeyboard((key: string) => {
    if (!field || !currentBlock) return
    const returnedPosition = calculatePosition(currentBlock.position, key)
    const { result } = changeBlockPosition(returnedPosition, field)

    if (key === 's' && !result) {
      mergeBlock()
    }
  })

  const onStart = () => {
    if (!currentBlock) return
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
