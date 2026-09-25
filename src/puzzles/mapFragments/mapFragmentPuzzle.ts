export type Position = {
  x: number
  y: number
}

export type RotationCheck = {
  current: number
  target: number
  tolerance: number
}

export const POSITION_TOLERANCE = 30
export const ROTATION_TOLERANCE = 10

export function isPositionCorrect(
  current: Position,
  target: Position,
): boolean {
  const distance = Math.sqrt(
    Math.pow(current.x - target.x, 2) +
      Math.pow(current.y - target.y, 2),
  )

  return distance <= POSITION_TOLERANCE
}

export function normalizeRotation(rotation: number): number {
  return ((rotation % 360) + 360) % 360
}

export function isRotationCorrect({
  current,
  target,
  tolerance,
}: RotationCheck): boolean {
  const normalizedCurrent = normalizeRotation(current)
  const normalizedTarget = normalizeRotation(target)

  const difference = Math.abs(normalizedCurrent - normalizedTarget)
  const shortestDifference = Math.min(difference, 360 - difference)

  return shortestDifference <= tolerance
}

export function canLockFragment(
  currentPosition: Position,
  targetPosition: Position,
  currentRotation: number,
  targetRotation: number,
): boolean {
  return (
    isPositionCorrect(currentPosition, targetPosition) &&
    isRotationCorrect({
      current: currentRotation,
      target: targetRotation,
      tolerance: ROTATION_TOLERANCE,
    })
  )
}