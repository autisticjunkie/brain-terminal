'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import LoadingScreen from '../components/LoadingScreen'
import Terminal from '../components/Terminal'

const welcomeText = `Welcome to the Reality Algorithm Generator

You are about to step into a space where the rules of existence bend, shatter, and reform at your command. In this realm, the boundaries between what is real and what is possible blur, allowing you to manipulate the very fabric of reality itself. The limitations of time, space, and even the laws of physics are but a canvas for your imagination.

Here, every choice you make has the potential to reshape the universe around you. Want to rewrite the laws of gravity? Test the limits of space-time? Or perhaps create entirely new worlds from scratch? The tools are at your fingertips.`

export default function Home() {
  const [currentStage, setCurrentStage] = useState<'welcome' | 'loading' | 'terminal'>('welcome')
  const [displayedText, setDisplayedText] = useState('')
  const [showEnterButton, setShowEnterButton] = useState(false)

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      setDisplayedText(welcomeText.slice(0, index))
      index++
      if (index > welcomeText.length) {
        clearInterval(timer)
        setShowEnterButton(true)
      }
    }, 50)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="h-screen w-screen bg-black text-green-500 font-mono overflow-hidden">
      <AnimatePresence>
        {currentStage === 'welcome' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full flex flex-col items-center justify-center p-8 relative"
          >
            <motion.div
              className="text-center mb-8 max-w-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {displayedText.split('\n').map((line, index) => (
                <p key={index} className="mb-4">{line}</p>
              ))}
            </motion.div>
            {showEnterButton && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-green-500 text-black px-6 py-3 rounded text-lg font-semibold hover:bg-green-400 transition-colors mb-20 sm:mb-8"
                onClick={() => setCurrentStage('loading')}
              >
                Enter
              </motion.button>
            )}
            <div className="absolute bottom-8 flex gap-4 sm:gap-8 flex-wrap justify-center w-full px-4">
              <Link href="https://t.me/example" className="text-green-500 hover:text-green-400 font-bold">TELEGRAM</Link>
              <Link href="https://twitter.com/example" className="text-green-500 hover:text-green-400 font-bold">TWITTER</Link>
              <Link href="https://dexscreener.com/example" className="text-green-500 hover:text-green-400 font-bold">DEXSCREENER</Link>
            </div>
          </motion.div>
        )}
        {currentStage === 'loading' && (
          <LoadingScreen onComplete={() => setCurrentStage('terminal')} />
        )}
        {currentStage === 'terminal' && (
          <Terminal />
        )}
      </AnimatePresence>
    </div>
  )
}
