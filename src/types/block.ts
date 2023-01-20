import { Bit } from "./base"

export type Position = { x: number, y: number }

export type RotationEnum = 0 | 1 | 2 | 3


// TODO - abstract away color from block.
export type BlockColor = 'red' | 'cyan' | 'orange' | 'blue' | 'red' | 'green' | 'purple' | 'yellow'
export type BlockType = 'i' | 'o' | 'j' | 'l' | 't' | 's' | 'z'
export type BlockRotation = 'clockwise' | 'c-clockwise'

export type BlockBitMap = Bit[][]

export type Block = {
  isMerged: boolean
  position: Position
  color: BlockColor
  blockType: BlockType
  rot: RotationEnum
}
