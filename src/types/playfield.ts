import { EMPTY_COLOR, WALL_COLOR } from "../constants/playfield"
import { Bit } from "./base"
import { BlockColor } from "./block"

export interface Pixel {
  color: BlockColor | typeof EMPTY_COLOR | typeof WALL_COLOR
  bit: Bit // NOTE - do we need this?
  pixelType: 'normal'
}

export type FieldBitMap = Bit[][]
export type PixelField = Pixel[][]

export type GameStatus = 'init' | 'pending' | 'started' | 'done'
