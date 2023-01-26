import { PixelField, Pixel } from "../types/playfield"

type Props = {
  pixelField: PixelField | undefined
}

export function PixelFieldDisplay(props: Props) {
  const { pixelField } = props

  const l = pixelField?.[0].length ?? 0

  return (
    <div>
      <div>
        {pixelField && pixelField.map((row, rowIndex) => (
          <div
            style={{
              display: 'flex'
            }}
            key={rowIndex}>
            <span style={{ display: 'inline-block', width: '20px' }}>{rowIndex}</span>
            {row.map((pixel, pixelIndex) => (
              <PixelBlock key={pixelIndex} pixel={pixel} />
            ))}</div>
        ))}
      </div>
      <div>
        <span style={{
          display: 'inline-block', width: '20px',
        }}> </span>
        {Array.from({ length: l }).map((_, i) => <span key={i} style={{
          textAlign: 'center',
          display: 'inline-block',
          width: '20px',
          margin: '0.5px'
        }}>{i}</span>)}
      </div>
    </div>
  )
}

type PixelProps = {
  pixel: Pixel
}

function PixelBlock(props: PixelProps) {
  const { color } = props.pixel

  return (
    <span style={{
      display: 'inline-block',
      boxSizing: 'border-box',
      backgroundColor: color,
      width: '20px',
      height: '20px',
      border: '0.5px solid gray',
      margin: '0.5px'
    }}>
    </span>
  )
}
