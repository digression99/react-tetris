import { Box } from '@chakra-ui/react'
import { Pixel } from "../types/playfield"

type Props = {
  pixel: Pixel
}

export function PixelBlock(props: Props) {
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
