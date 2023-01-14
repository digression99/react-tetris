import { useRef, useState, useEffect } from 'react'
import { PLAYFIELD_MAP } from "../constants/playfield"
import { FieldBitMap } from '../types'
import { mergeBlockToFieldBitMap, drawBlockToFieldBitMap } from '../utils/playfield'
import { useBlock } from './useBlock'

// - merge block.
//   - merge the block in the field.
//   - should generate a new block.
//   - update the block bag.(hidden inside the useBlock hook.)
export function usePlayfield() {
  // fieldBuffer for merged blocks.
  // we should later change this to something else.
  const fieldBuffer = useRef<FieldBitMap>(PLAYFIELD_MAP)
  const [field, setField] = useState<FieldBitMap>(PLAYFIELD_MAP)
  const { currentBlock, getNextBlock } = useBlock()

  // useEffect(() => {
  //   if (!currentBlock) return
  //   // always start with the brand new fieldmap.
  //   setField(fieldMap => drawBlock(currentBlock, fieldMap))
  // }, [currentBlock])

  // TODO - change this drawing behavior to the reactive way.
  // You don't know if this is the current block or the next.
  const drawBlock = () => {
    if (!currentBlock) return
    setField(fieldMap => drawBlockToFieldBitMap(currentBlock, fieldMap))
  }

  // NOTE - the mergeBlock should be called,
  // since we don't know when to merge.
  const mergeBlock = () => {
    if (!currentBlock) return
    fieldBuffer.current = mergeBlockToFieldBitMap(field, currentBlock)
    // setField(fieldBuffer.current)
    const nextBlock = getNextBlock()
    if (!nextBlock) return
    setField(drawBlockToFieldBitMap(nextBlock, fieldBuffer.current))




    // Need to draw the next block, not here.
    // Can we detect if "nextBlock" is changed?
  }

  // if block position is changed, then redraw the block.
  // But, how could you know that the block position is changed? -> just call the method.
  return { field, mergeBlock, drawBlock }
}
