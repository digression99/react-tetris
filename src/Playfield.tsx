import { useBlock } from './hooks/useBlock'
import { useCountTime } from './hooks/base/useCountTime'
import { usePlayfield } from './hooks/usePlayfield'
import { useGameController } from './hooks/useGameController'

export function Playfield() {
  const { mergeBlock, fieldBuffer, field } = usePlayfield()
  const { currentBlock, changeBlockPosition } = useBlock()

  useGameController()

  const { start } = useCountTime((t: number) => {
    if (!field || !currentBlock) return

    // NOTE - using "fieldBuffer" is too concrete.
    // Should hide the logic.
    const { result } = changeBlockPosition({
      ...currentBlock.position,
      y: currentBlock.position.y + 1
    }, fieldBuffer)

    if (!result) {
      mergeBlock()
    }
  }, [fieldBuffer, currentBlock])


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
