import { motion } from 'framer-motion'
import { PackageOpen } from 'lucide-react'

type PrologueProps = {
  onContinue?: () => void
}

function Prologue({ onContinue }: PrologueProps) {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0d0c09] px-6 text-[#e8dfc8]">
      {/* Atmospheric background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6d5934]/10 blur-[140px]" />

        <svg
          className="absolute inset-0 h-full w-full opacity-[0.055]"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 650 C180 560 300 690 450 560 C600 430 700 570 850 450 C1000 330 1100 450 1200 340"
            fill="none"
            stroke="#b29a68"
            strokeWidth="2"
          />

          <path
            d="M0 700 C190 610 300 730 470 600 C620 480 730 620 880 500 C1010 390 1110 500 1200 420"
            fill="none"
            stroke="#8d7952"
            strokeWidth="1"
          />

          <circle
            cx="950"
            cy="220"
            r="140"
            fill="none"
            stroke="#a48a59"
            strokeWidth="1"
            strokeDasharray="5 12"
          />

          <circle
            cx="950"
            cy="220"
            r="80"
            fill="none"
            stroke="#a48a59"
            strokeWidth="1"
          />

          <path
            d="M950 65 L950 375 M795 220 L1105 220"
            stroke="#a48a59"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
          ease: 'easeOut',
        }}
        className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center"
      >
        {/* Chapter label */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.2em' }}
          animate={{ opacity: 1, letterSpacing: '0.45em' }}
          transition={{
            duration: 1,
            delay: 0.2,
          }}
          className="text-[10px] uppercase text-[#8f7b54] md:text-xs"
        >
          Prologue
        </motion.p>

        {/* Title */}
        <h1 className="mt-6 font-serif text-5xl tracking-wide text-[#e5d6b4] md:text-6xl">
          The Package
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 0.9,
            delay: 0.6,
          }}
          className="mt-7 h-px w-24 origin-center bg-[#806d48]"
        />

        {/* Narrative */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.9,
          }}
          className="mt-8 max-w-xl font-serif text-base leading-8 text-[#9f967f] md:text-lg"
        >
          An old expedition box has found its way to you.
          <br />
          There is no sender.
          <br />
          No explanation.
        </motion.p>

        {/* Expedition box */}
        <motion.button
          type="button"
          initial={{
            opacity: 0,
            y: 35,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 1,
            delay: 1.3,
            ease: 'easeOut',
          }}
          whileHover={{
            y: -5,
          }}
          whileTap={{
            scale: 0.98,
          }}
          onClick={onContinue}
          className="group relative mt-12 w-full max-w-md cursor-pointer"
        >
          {/* Shadow */}
          <div className="absolute inset-x-8 bottom-[-18px] h-10 rounded-full bg-black/60 blur-2xl" />

          {/* Box */}
          <div className="relative overflow-hidden border border-[#69583b] bg-[#241c13] p-8 shadow-[0_30px_70px_rgba(0,0,0,0.55)] transition duration-500 group-hover:border-[#9c8250]">
            {/* Lid edge */}
            <div className="absolute inset-x-0 top-0 h-3 border-b border-[#59492f] bg-[#302416]" />

            {/* Decorative corners */}
            <div className="absolute left-5 top-5 h-8 w-8 border-l border-t border-[#766342]" />
            <div className="absolute right-5 top-5 h-8 w-8 border-r border-t border-[#766342]" />
            <div className="absolute bottom-5 left-5 h-8 w-8 border-b border-l border-[#766342]" />
            <div className="absolute bottom-5 right-5 h-8 w-8 border-b border-r border-[#766342]" />

            <div className="relative flex flex-col items-center py-8">
              {/* Icon */}
              <motion.div
                animate={{
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="flex h-16 w-16 items-center justify-center rounded-full border border-[#806d48] bg-[#18130e] text-[#c3a66d]"
              >
                <PackageOpen
                  size={28}
                  strokeWidth={1.2}
                />
              </motion.div>

              {/* Label */}
              <p className="mt-6 text-[10px] uppercase tracking-[0.4em] text-[#8f7b54]">
                Unknown Origin
              </p>

              <h2 className="mt-3 font-serif text-2xl text-[#d8c69e]">
                Expedition Box
              </h2>

              <p className="mt-3 max-w-xs text-sm leading-6 text-[#817766]">
                Its contents have remained sealed for a very long time.
              </p>

              {/* Interaction */}
              <div className="mt-7 border border-[#69583b] px-6 py-3 text-[10px] uppercase tracking-[0.3em] text-[#b49a69] transition group-hover:bg-[#302719] group-hover:text-[#e5d6b4]">
                Open the box
              </div>
            </div>
          </div>
        </motion.button>

        {/* Hint */}
        <p className="mt-8 text-[9px] uppercase tracking-[0.3em] text-[#514b40]">
          Investigate
        </p>
      </motion.div>
    </main>
  )
}

export default Prologue