export type Position = { x: number, y: number }

export type FieldBitMap = number[][]
export type BlockBitMap = number[][]

export type Block = {
  bitMap: BlockBitMap
  isMerged: boolean
  position: Position
  color: 'red'
  blockType: 'i' // types: i, o, j, l, t, s, z
}
