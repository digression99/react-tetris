export const NORMAL_ROW = [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1]
export const BOTTOM = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

export const PLAYFIELD_PADDING = 2
export const PLAYFIELD_HEIGHT = 22
export const PLAYFIELD_WIDTH = 10

export const createPlayfieldMap = () => {
  return [
    ...Array.from({ length: PLAYFIELD_HEIGHT }).map(() => [...NORMAL_ROW]),
    [...BOTTOM],
    [...BOTTOM],
  ]
}


