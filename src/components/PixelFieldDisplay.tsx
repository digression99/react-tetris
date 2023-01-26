import { Box } from "@chakra-ui/react"
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
          <Box
            display='flex'
            key={rowIndex}>
            <Box lineHeight='20px' display='inline-block' width='20px'>{rowIndex}</Box>
            {row.map((pixel, pixelIndex) => (
              <PixelBlock key={pixelIndex} pixel={pixel} />
            ))}
          </Box>
        ))}
      </div>
      <div>
        <Box
          display='inline-block'
          width='20px'
        > </Box>
        {Array.from({ length: l }).map((_, i) => <Box key={i}
          textAlign='center' display='inline-block' width='20px'
          margin='0.5px'
          lineHeight=''
        >{i}</Box>)}
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
    <Box
      display='inline-block'
      boxSizing='border-box'
      backgroundColor={color}
      width='20px'
      height='20px'
      border='0.5px solid gray'
      margin='0.5px'
    />
  )
}
