export type Position = { x: number, y: number }

export type BlockColor = 'red' | 'cyan' | 'orange' | 'blue' | 'red' | 'green' | 'purple' | 'yellow'
export type BlockType = 'i' | 'o' | 'j' | 'l' | 't' | 's' | 'z'

export type FieldBitMap = number[][]
export type BlockBitMap = number[][]

export type Block = {
  // bitMap should be returned with rotation.
  // bitMap: BlockBitMap
  isMerged: boolean
  position: Position
  color: BlockColor
  blockType: BlockType
  rot: number // 0, 1, 2, 3
}
