import { useEffect, useRef } from 'react'
import MapFragment from '../MapFragment/MapFragment'

import { mapFragmentDefinitions } from '../../data/mapFragments'
import { useExpeditionStore } from '../../store/expeditionStore'

function MapBoard() {
  const boardRef = useRef<HTMLDivElement>(null)

  const mapFragments = useExpeditionStore(
    (state) => state.mapFragments,
  )

  const setMapFragments = useExpeditionStore(
    (state) => state.setMapFragments,
  )

  useEffect(() => {
    setMapFragments(
      mapFragmentDefinitions.map((definition) => ({
        id: definition.id,
        x: definition.startPosition.x,
        y: definition.startPosition.y,
        rotation: definition.startRotation,
        placed: false,
        locked: false,
      })),
    )
  }, [setMapFragments])

  const isComplete =
    mapFragments.length > 0 &&
    mapFragments.every((fragment) => fragment.locked)

  return (
    <section className="relative w-full max-w-5xl px-6">
      <div
        ref={boardRef}
        className="relative mx-auto aspect-[16/9] w-full overflow-hidden rounded-lg border border-[#6f6047] bg-[#191711] shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
      >
        {/* MAP */}
        <div className="absolute inset-0">
          <svg
            viewBox="0 0 1000 562"
            className="h-full w-full"
            preserveAspectRatio="none"
          >
            <rect
              width="1000"
              height="562"
              fill="#29251d"
            />

            <path
              d="M0 410 C150 350, 210 430, 340 330 C470 230, 560 300, 670 200 C790 90, 880 160, 1000 70"
              fill="none"
              stroke="#574d39"
              strokeWidth="5"
            />

            <path
              d="M0 455 C160 400, 230 475, 360 375 C480 280, 570 345, 690 245 C800 145, 900 210, 1000 120"
              fill="none"
              stroke="#3f392c"
              strokeWidth="3"
            />

            <path
              d="M100 120 C170 160, 230 130, 290 175 C350 220, 390 185, 440 220"
              fill="none"
              stroke="#665a42"
              strokeWidth="2"
              strokeDasharray="8 10"
            />

            {/* RIGHT-SIDE TARGET */}
            <circle
              cx="720"
              cy="350"
              r="48"
              fill="none"
              stroke="#a68b58"
              strokeWidth="2"
              strokeDasharray="7 7"
            />

            <circle
              cx="720"
              cy="350"
              r="8"
              fill="none"
              stroke="#c4a96d"
              strokeWidth="2"
            />

            <path
              d="M720 295 L720 405"
              stroke="#a68b58"
              strokeWidth="1"
            />

            <path
              d="M665 350 L775 350"
              stroke="#a68b58"
              strokeWidth="1"
            />

            <text
              x="720"
              y="425"
              textAnchor="middle"
              fill="#a68b58"
              fontSize="12"
              fontFamily="serif"
              letterSpacing="3"
            >
              ALIGNMENT POINT
            </text>

            <text
              x="500"
              y="70"
              textAnchor="middle"
              fill="#857657"
              fontSize="20"
              fontFamily="serif"
              letterSpacing="8"
            >
              SILENT MOUNTAINS
            </text>
          </svg>
        </div>

        {/* FRAGMENTS */}
        <div className="absolute inset-0">
          {mapFragments.map((fragment) => (
            <MapFragment
              key={fragment.id}
              id={fragment.id}
              boardRef={boardRef}
            />
          ))}
        </div>

        {/* HEADER */}
        <div className="pointer-events-none absolute left-5 top-5">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#988968]">
            Cartographic Reconstruction
          </p>

          <h2 className="mt-1 font-serif text-xl text-[#d9c9a4]">
            Fragment Alignment
          </h2>
        </div>

        {/* INSTRUCTIONS */}
        <div className="pointer-events-none absolute bottom-5 left-5">
          <p className="text-xs text-[#8d836f]">
            Drag the fragment onto the alignment point.
          </p>

          <p className="mt-1 text-xs text-[#756d5d]">
            Select it to reveal the rotation control.
          </p>
        </div>

        {/* COMPLETION */}
        {isComplete && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#11100d]/45 backdrop-blur-[2px]">
            <div className="border border-[#a68b58] bg-[#211c15]/95 px-8 py-6 text-center shadow-2xl">
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#aa9364]">
                Reconstruction Complete
              </p>

              <p className="mt-3 font-serif text-2xl text-[#e5d6b3]">
                The route has been restored.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default MapBoard