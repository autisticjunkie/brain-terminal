'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.muted = false
      video.volume = 0.5 // Adjust volume as needed
      video.play().catch(console.error)
      video.onended = onComplete
    }
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="h-full w-full flex flex-col items-center justify-center bg-black"
    >
      <video
        ref={videoRef}
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/video5949276500988532305-x4QxKcAdjh6RxDFRO9y9l7hFefW2fj.mp4"
        className="max-w-full max-h-full object-contain"
        playsInline
        autoPlay
      />
    </motion.div>
  )
}

