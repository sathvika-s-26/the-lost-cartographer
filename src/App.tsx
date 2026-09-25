import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import Prologue from './scenes/Prologue/Prologue'
import OpenedBox from './scenes/OpenedBox/OpenedBox'

type Scene = 'prologue' | 'opened-box'

function App() {
  const [scene, setScene] = useState<Scene>('prologue')

  return (
    <div className="min-h-screen bg-[#0d0c09] text-[#e8dfc8]">
      <AnimatePresence mode="wait">
        {scene === 'prologue' && (
          <motion.div
            key="prologue"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Prologue
              onContinue={() => {
                setScene('opened-box')
              }}
            />
          </motion.div>
        )}

        {scene === 'opened-box' && (
          <motion.div
            key="opened-box"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <OpenedBox />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App