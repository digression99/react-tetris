const MAX_TIME = 60
const BASE_GRAVITY = 50

function determineLineScore(lines: number): number {
  switch (lines) {
    case 1:
      return 1
    case 2:
      return 4
    case 3:
      return 8
    case 4:
      return 16
    default:
      return 0
  }
}

function determineAdditionalTime(lines: number): number {
  switch (lines) {
    case 1:
      return 5
    case 2:
      return 10
    case 3:
      return 15
    case 4:
      return 20
    default:
      return 0
  }
}

export function calculateScore(linesCount: number, level: number): number {
  return determineLineScore(linesCount) * level
}

export function calculateAdditionalTime(currentTime: number, linesCount: number, level: number): number {
  const calculatedAdditionalTime = Math.max(0, determineAdditionalTime(linesCount) - Math.floor(level / 3))
  return Math.min(currentTime + calculatedAdditionalTime, MAX_TIME)
}

export function calculateLinesLeft(level: number): number {
  const base = level * 10
  const offset = level
  return base + offset
}

export function calculateGravity(level: number): number {
  return BASE_GRAVITY + level * 2
}

