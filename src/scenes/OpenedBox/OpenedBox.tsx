import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Compass,
  FileText,
  Map,
  Package,
  ScrollText,
  X,
} from 'lucide-react'

type BoxItemId =
  | 'compass'
  | 'map'
  | 'journal'
  | 'artifact'
  | 'letter'

type BoxItem = {
  id: BoxItemId
  label: string
  description: string
  icon: typeof Compass
  className: string
  detail: string
}

const items: BoxItem[] = [
  {
    id: 'compass',
    label: 'Compass',
    description: 'An old brass compass with an unusual needle.',
    icon: Compass,
    className: 'left-[18%] top-[24%]',
    detail:
      'A weathered brass compass. The glass is scratched, but the mechanism beneath it appears remarkably intact. The needle does not seem to settle normally.',
  },
  {
    id: 'map',
    label: 'Torn Map',
    description: 'A weathered map with a missing section.',
    icon: Map,
    className: 'right-[17%] top-[23%]',
    detail:
      'An old expedition map. Several mountain ranges are carefully marked, but an entire region has been torn away.',
  },
  {
    id: 'journal',
    label: 'Journal',
    description: 'A field journal filled with faded handwriting.',
    icon: ScrollText,
    className: 'left-[28%] bottom-[20%]',
    detail:
      'The pages are filled with field notes, sketches, measurements, and observations. The handwriting belongs to someone who spent years exploring unfamiliar territory.',
  },
  {
    id: 'artifact',
    label: 'Metal Artifact',
    description: 'A strange object covered in unfamiliar markings.',
    icon: Package,
    className: 'right-[28%] bottom-[19%]',
    detail:
      'A small metal object covered in unfamiliar markings. It appears deliberately constructed, but its purpose is unclear.',
  },
  {
    id: 'letter',
    label: 'Sealed Letter',
    description: 'A letter sealed with dark red wax.',
    icon: FileText,
    className: 'left-1/2 top-[39%] -translate-x-1/2',
    detail:
      'A sealed letter. The paper is yellowed with age. The wax seal remains unbroken.',
  },
]

function OpenedBox() {
  const [selectedItem, setSelectedItem] =
    useState<BoxItemId | null>(null)

  const [compassRotation, setCompassRotation] = useState(0)

  const selected = items.find(
    (item) => item.id === selectedItem,
  )

  const isCompassSelected = selectedItem === 'compass'

  const rotateCompass = () => {
    setCompassRotation((current) => current + 90)
  }

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0b0a08] px-6 text-[#e8dfc8]">
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#806b42]/10 blur-[150px]" />

        <div className="absolute inset-0 opacity-[0.035]">
          <svg
            className="h-full w-full"
            viewBox="0 0 1200 800"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0 620 C160 550 260 650 410 540 C560 430 690 560 830 440 C970 320 1090 430 1200 330"
              fill="none"
              stroke="#c1a66d"
              strokeWidth="2"
            />

            <circle
              cx="180"
              cy="180"
              r="100"
              fill="none"
              stroke="#b49a61"
              strokeWidth="1"
              strokeDasharray="4 12"
            />
          </svg>
        </div>
      </div>

      {/* Header */}
      <div className="pointer-events-none absolute left-6 top-6 z-30 md:left-10 md:top-10">
        <p className="text-[9px] uppercase tracking-[0.45em] text-[#806d48]">
          Expedition Archive
        </p>

        <h1 className="mt-2 font-serif text-2xl text-[#d8c69e] md:text-3xl">
          Recovered Materials
        </h1>
      </div>

      {/* Box */}
      <motion.section
        initial={{
          opacity: 0,
          scale: 0.94,
          y: 25,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 1.1,
          ease: 'easeOut',
        }}
        className="relative mt-12 aspect-[1.45] w-full max-w-5xl"
      >
        <div className="absolute inset-x-[8%] bottom-[-8%] h-[18%] rounded-full bg-black/70 blur-3xl" />

        <div className="absolute inset-0 overflow-hidden rounded-sm border border-[#705d3d] bg-[#261d13] shadow-[0_35px_100px_rgba(0,0,0,0.65)]">
          <div className="absolute inset-[3%] border border-[#4d3d27] bg-[#17120d]" />

          <div className="absolute inset-[7%] overflow-hidden border border-[#59482f] bg-[#211911]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#332719_0%,#1c150f_65%,#120e0a_100%)]" />

            <div className="absolute left-[5%] top-[8%] h-px w-[20%] rotate-[-8deg] bg-[#665337]/40" />
            <div className="absolute right-[8%] bottom-[12%] h-px w-[17%] rotate-[12deg] bg-[#665337]/30" />
            <div className="absolute left-[15%] bottom-[17%] h-px w-[12%] rotate-[4deg] bg-[#665337]/25" />
          </div>

          <div className="absolute left-3 top-3 h-12 w-12 border-l border-t border-[#806b46]/60" />
          <div className="absolute right-3 top-3 h-12 w-12 border-r border-t border-[#806b46]/60" />
          <div className="absolute bottom-3 left-3 h-12 w-12 border-b border-l border-[#806b46]/60" />
          <div className="absolute bottom-3 right-3 h-12 w-12 border-b border-r border-[#806b46]/60" />
        </div>

        {/* Objects */}
        {items.map((item, index) => {
          const Icon = item.icon

          return (
            <motion.button
              key={item.id}
              type="button"
              initial={{
                opacity: 0,
                y: 18,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.65,
                delay: 0.45 + index * 0.12,
                ease: 'easeOut',
              }}
              whileHover={{
                y: -7,
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() => setSelectedItem(item.id)}
              className={`absolute z-20 ${item.className} group flex h-[20%] min-h-20 w-[20%] min-w-24 items-center justify-center`}
            >
              <div className="absolute inset-x-[12%] bottom-[-8%] h-5 rounded-full bg-black/70 blur-md" />

              <div className="relative flex h-full w-full flex-col items-center justify-center border border-[#806d48]/70 bg-[#292016]/95 px-2 shadow-[0_12px_25px_rgba(0,0,0,0.5)] transition duration-300 group-hover:border-[#b29a68] group-hover:bg-[#33281b]">
                <Icon
                  size={28}
                  strokeWidth={1.25}
                  className="text-[#c0a36b]"
                />

                <span className="mt-2 text-[9px] uppercase tracking-[0.22em] text-[#d2c09a]">
                  {item.label}
                </span>

                <span className="mt-1 hidden max-w-[150px] text-center text-[9px] leading-4 text-[#746b5b] md:block">
                  {item.description}
                </span>
              </div>
            </motion.button>
          )
        })}

        <div className="pointer-events-none absolute left-1/2 top-[46%] z-10 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full border border-[#755f3c]/50 bg-[#17110c]/80">
          <div className="h-12 w-12 rounded-full border border-dashed border-[#806b46]/50" />
        </div>
      </motion.section>

      {/* Bottom instruction */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 1.8,
        }}
        className="absolute bottom-7 left-1/2 z-30 -translate-x-1/2 text-center"
      >
        <p className="text-[9px] uppercase tracking-[0.35em] text-[#625949]">
          Investigate the recovered materials
        </p>
      </motion.div>

      {/* Inspection overlay */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-[#080705]/80 px-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 10,
              }}
              transition={{
                duration: 0.3,
              }}
              className="relative w-full max-w-xl border border-[#705d3d] bg-[#1b1510] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.7)] md:p-10"
            >
              <button
                type="button"
                aria-label="Close inspection"
                onClick={() => setSelectedItem(null)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border border-[#59482f] text-[#8f8067] transition hover:border-[#a68b58] hover:text-[#e5d6b4]"
              >
                <X size={17} strokeWidth={1.5} />
              </button>

              {/* SPECIAL COMPASS INSPECTION */}
              {isCompassSelected ? (
                <div className="flex flex-col items-center text-center">
                  <p className="text-[9px] uppercase tracking-[0.4em] text-[#806d48]">
                    Object Inspection
                  </p>

                  <h2 className="mt-3 font-serif text-3xl text-[#e1d1ae]">
                    Compass
                  </h2>

                  <div className="relative mt-8 flex h-56 w-56 items-center justify-center rounded-full border border-[#806d48] bg-[#120f0b] shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                    <div className="absolute inset-4 rounded-full border border-[#5f4c30]" />

                    <div className="absolute inset-7 rounded-full border border-dashed border-[#806d48]/60" />

                    <motion.div
                      animate={{
                        rotate: compassRotation,
                      }}
                      transition={{
                        duration: 0.45,
                        ease: 'easeInOut',
                      }}
                      className="relative h-40 w-40"
                    >
                      <div className="absolute left-1/2 top-1/2 h-[2px] w-32 -translate-x-1/2 -translate-y-1/2 rotate-[-25deg] bg-[#b99b62]" />

                      <div className="absolute left-1/2 top-1/2 h-32 w-[2px] -translate-x-1/2 -translate-y-1/2 rotate-[65deg] bg-[#6f5a39]" />

                      <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c3a66d] bg-[#1b1510]" />

                      <span className="absolute left-1/2 top-0 -translate-x-1/2 font-serif text-xs text-[#927b50]">
                        N
                      </span>

                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 font-serif text-xs text-[#927b50]">
                        S
                      </span>

                      <span className="absolute left-0 top-1/2 -translate-y-1/2 font-serif text-xs text-[#927b50]">
                        W
                      </span>

                      <span className="absolute right-0 top-1/2 -translate-y-1/2 font-serif text-xs text-[#927b50]">
                        E
                      </span>
                    </motion.div>
                  </div>

                  <div className="mt-7 h-px w-20 bg-[#69583b]" />

                  <p className="mt-6 max-w-md text-sm leading-7 text-[#978b75]">
                    The compass is old, but its mechanism is remarkably intact.
                    The needle refuses to settle in one direction.
                  </p>

                  <p className="mt-3 max-w-md text-xs leading-6 text-[#756b5b]">
                    Something about its orientation feels wrong.
                  </p>

                  <button
                    type="button"
                    onClick={rotateCompass}
                    className="mt-7 border border-[#69583b] px-7 py-3 text-[9px] uppercase tracking-[0.3em] text-[#b49a69] transition hover:border-[#a68b58] hover:bg-[#2a2117] hover:text-[#e5d6b4]"
                  >
                    Rotate Compass
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="mt-3 px-6 py-2 text-[9px] uppercase tracking-[0.3em] text-[#625949] transition hover:text-[#b49a69]"
                  >
                    Return to box
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#806d48] bg-[#120f0b]">
                    <selected.icon
                      size={34}
                      strokeWidth={1.2}
                      className="text-[#c3a66d]"
                    />
                  </div>

                  <p className="mt-6 text-[9px] uppercase tracking-[0.4em] text-[#806d48]">
                    Object Inspection
                  </p>

                  <h2 className="mt-3 font-serif text-3xl text-[#e1d1ae]">
                    {selected.label}
                  </h2>

                  <div className="mt-6 h-px w-20 bg-[#69583b]" />

                  <p className="mt-6 max-w-md text-sm leading-7 text-[#978b75]">
                    {selected.detail}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="mt-8 border border-[#69583b] px-6 py-3 text-[9px] uppercase tracking-[0.3em] text-[#b49a69] transition hover:border-[#a68b58] hover:bg-[#2a2117] hover:text-[#e5d6b4]"
                  >
                    Return to box
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default OpenedBox