import { useState } from 'react'
import type { RefObject } from 'react'
import { motion } from 'framer-motion'
import { RotateCw } from 'lucide-react'

import { mapFragmentDefinitions } from '../../data/mapFragments'
import { canLockFragment } from '../../puzzles/mapFragments/mapFragmentPuzzle'
import { useExpeditionStore } from '../../store/expeditionStore'

type MapFragmentProps = {
  id: string
  boardRef: RefObject<HTMLDivElement | null>
}

const FRAGMENT_WIDTH = 180
const FRAGMENT_HEIGHT = 130

function MapFragment({
  id,
  boardRef,
}: MapFragmentProps) {
  const definition = mapFragmentDefinitions.find(
    (fragment) => fragment.id === id,
  )

  const fragment = useExpeditionStore((state) =>
    state.mapFragments.find((item) => item.id === id),
  )

  const updateMapFragment = useExpeditionStore(
    (state) => state.updateMapFragment,
  )

  const [isSelected, setIsSelected] = useState(false)

  if (!definition || !fragment) {
    return null
  }

  /*
   * Convert the visual SVG target:
   *
   * SVG target = 720 x 350
   *
   * into the actual CSS dimensions of the responsive board.
   */
  const getTargetPosition = () => {
    const board = boardRef.current

    if (!board) {
      return {
        x: 630,
        y: 285,
      }
    }

    const boardWidth = board.clientWidth
    const boardHeight = board.clientHeight

    const targetCenterX =
      (720 / 1000) * boardWidth

    const targetCenterY =
      (350 / 562) * boardHeight

    return {
      x: targetCenterX - FRAGMENT_WIDTH / 2,
      y: targetCenterY - FRAGMENT_HEIGHT / 2,
    }
  }

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: {
      offset: {
        x: number
        y: number
      }
    },
  ) => {
    if (fragment.locked) {
      return
    }

    /*
     * Framer Motion gives us how far the fragment
     * moved during this drag.
     *
     * We add that movement to its previous position.
     */
    const nextPosition = {
      x: fragment.x + info.offset.x,
      y: fragment.y + info.offset.y,
    }

    const targetPosition = getTargetPosition()

    const shouldLock = canLockFragment(
      nextPosition,
      targetPosition,
      fragment.rotation,
      definition.correctRotation,
    )

    if (shouldLock) {
      updateMapFragment(id, {
        x: targetPosition.x,
        y: targetPosition.y,
        rotation: definition.correctRotation,
        placed: true,
        locked: true,
      })

      setIsSelected(false)

      return
    }

    updateMapFragment(id, {
      x: nextPosition.x,
      y: nextPosition.y,
      placed: true,
    })
  }

  const handleRotate = () => {
    if (fragment.locked) {
      return
    }

    const nextRotation = fragment.rotation + 90

    const targetPosition = getTargetPosition()

    const shouldLock = canLockFragment(
      {
        x: fragment.x,
        y: fragment.y,
      },
      targetPosition,
      nextRotation,
      definition.correctRotation,
    )

    if (shouldLock) {
      updateMapFragment(id, {
        x: targetPosition.x,
        y: targetPosition.y,
        rotation: definition.correctRotation,
        placed: true,
        locked: true,
      })

      setIsSelected(false)

      return
    }

    updateMapFragment(id, {
      rotation: nextRotation,
      placed: true,
    })
  }

  return (
    <motion.div
      drag={!fragment.locked}
      dragMomentum={false}
      dragElastic={0}
      initial={{
        x: fragment.x,
        y: fragment.y,
        rotate: fragment.rotation,
      }}
      animate={{
        x: fragment.x,
        y: fragment.y,
        rotate: fragment.rotation,
      }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 24,
      }}
      onDragStart={() => {
        setIsSelected(true)
      }}
      onDragEnd={handleDragEnd}
      onClick={() => {
        if (!fragment.locked) {
          setIsSelected(true)
        }
      }}
      className="absolute left-0 top-0 z-20"
      style={{
        width: FRAGMENT_WIDTH,
        height: FRAGMENT_HEIGHT,
        cursor: fragment.locked ? 'default' : 'grab',
        touchAction: 'none',
      }}
    >
      <div
        className={[
          'relative h-full w-full overflow-hidden rounded-sm',
          'border border-[#8f7a52]',
          'bg-[#d8c79f]',
          'shadow-[0_12px_30px_rgba(0,0,0,0.35)]',
          fragment.locked
            ? 'ring-2 ring-[#b99a5c]'
            : isSelected
              ? 'ring-2 ring-[#c8ad73]'
              : '',
        ].join(' ')}
      >
        <svg
          viewBox="0 0 180 130"
          className="absolute inset-0 h-full w-full"
          aria-label={definition.label}
          role="img"
        >
          <rect
            x="0"
            y="0"
            width="180"
            height="130"
            fill="#d8c79f"
          />

          <path
            d="M8 96 C28 76, 38 82, 54 62 C68 45, 78 55, 92 35 C108 14, 125 27, 138 17"
            fill="none"
            stroke="#756648"
            strokeWidth="3"
          />

          <path
            d="M12 108 C34 96, 45 104, 61 87 C78 69, 89 77, 103 56 C119 34, 132 47, 168 20"
            fill="none"
            stroke="#a08b62"
            strokeWidth="2"
          />

          <circle
            cx="126"
            cy="80"
            r="8"
            fill="none"
            stroke="#6d5b3e"
            strokeWidth="2"
          />

          <path
            d="M118 80 L134 80 M126 72 L126 88"
            stroke="#6d5b3e"
            strokeWidth="1.5"
          />

          <text
            x="12"
            y="20"
            fill="#5f5037"
            fontSize="9"
            fontFamily="serif"
            letterSpacing="1.5"
          >
            WESTERN RIDGE
          </text>
        </svg>

        {isSelected && !fragment.locked && (
          <button
            type="button"
            aria-label="Rotate map fragment"
            onPointerDown={(event) => {
              event.stopPropagation()
            }}
            onClick={(event) => {
              event.stopPropagation()
              handleRotate()
            }}
            className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full border border-[#8f7a52] bg-[#241f17]/90 text-[#e8dfc8] shadow-lg transition hover:bg-[#352d20]"
          >
            <RotateCw
              size={17}
              strokeWidth={1.7}
            />
          </button>
        )}

        {fragment.locked && (
          <div className="absolute inset-x-0 bottom-0 bg-[#302719]/85 px-2 py-1 text-center text-[10px] uppercase tracking-[0.25em] text-[#dfcfaa]">
            Aligned
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default MapFragment