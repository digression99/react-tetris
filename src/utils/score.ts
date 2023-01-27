
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

export function calculateScore(removedLines: number, level: number): number {
  return determineLineScore(removedLines) * level
}
