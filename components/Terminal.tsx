'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useChat } from 'ai/react'

export default function Terminal() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    onResponse: (response) => {
      addLog(`Received response from AI`)
    },
    onFinish: (message) => {
      addLog(`AI response completed: ${message.content.slice(0, 50)}...`)
    },
  })
  const [logs, setLogs] = useState<string[]>([
    "System initialized...",
    "Running diagnostics...",
    "All systems operational"
  ])
  const [seqProgress, setSeqProgress] = useState(0)
  const [seqStatus, setSeqStatus] = useState("ANALYZING")
  const videoRef = useRef<HTMLVideoElement>(null)
  const seqAnimation = useAnimation()

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }, [])

  const addLog = (log: string) => {
    setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] ${log}`])
  }

  const animateSeq = async () => {
    await seqAnimation.start({ width: "100%", transition: { duration: 2 } })
    setSeqStatus("SUCCESS")
    setTimeout(() => {
      setSeqProgress(0)
      setSeqStatus("ANALYZING")
      seqAnimation.set({ width: "0%" })
    }, 2000)
  }

  const handleChatSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addLog(`Command executed: ${input}`)
    handleSubmit(e)
    animateSeq()
  }

  return (
    <div className="h-screen w-screen p-8 bg-black text-green-500 font-mono flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-full max-w-7xl max-h-[900px] rounded-lg border border-green-500/30 bg-black/90 backdrop-blur-sm p-8"
      >
        {/* Corner Brackets */}
        <div className="absolute -top-3 -left-3 w-12 h-12 border-l-2 border-t-2 border-green-500" />
        <div className="absolute -top-3 -right-3 w-12 h-12 border-r-2 border-t-2 border-green-500" />
        <div className="absolute -bottom-3 -left-3 w-12 h-12 border-l-2 border-b-2 border-green-500" />
        <div className="absolute -bottom-3 -right-3 w-12 h-12 border-r-2 border-b-2 border-green-500" />

        {/* Header Text */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black px-4 text-sm text-green-500/70">
          PRODUCT OF SCIENCE
        </div>

        <div className="flex h-full gap-6">
          {/* Left Panel - 3D Visualization */}
          <div className="w-1/2 rounded border border-green-500/30 p-4 relative">
            <div className="absolute top-0 left-0 w-full p-2 text-center border-b border-green-500/30">
              CRANIAL SCAN
            </div>
            <div className="h-[calc(100%-2rem)] flex items-center justify-center mt-8">
              <video
                ref={videoRef}
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/video5949276500988532294-sNWpZUcJyPC8ycNA0TMOzutWwvnNhi.mp4"
                className="w-3/4 h-3/4 object-contain"
                loop
                muted
                playsInline
              />
            </div>
            <div className="absolute bottom-2 left-2 text-xs text-green-500/50">
              ACTIVE SCANNING
            </div>
          </div>

          {/* Right Panels Grid */}
          <div className="w-1/2 grid grid-rows-[auto_1fr_auto] gap-4">
            {/* Top Panel - DNA Blood Analysis (Smaller) */}
            <div className="rounded border border-green-500/30 p-4 relative">
              <div className="absolute top-0 left-0 w-full p-2 text-center border-b border-green-500/30">
                DNA BLOOD ANALYSIS
              </div>
              <div className="mt-8 p-2">
                <div className="text-sm mb-2">SEQ: {seqStatus}</div>
                <div className="h-2 bg-green-500/20 rounded">
                  <motion.div
                    className="h-full bg-green-500 rounded"
                    initial={{ width: "0%" }}
                    animate={seqAnimation}
                  />
                </div>
              </div>
            </div>

            {/* Middle Panel - Chat (Larger) */}
            <div className="rounded border border-green-500/30 p-4 relative row-span-1">
              <div className="absolute top-0 left-0 w-full p-2 text-center border-b border-green-500/30">
                GENERATE REALITY
              </div>
              <div className="mt-8 h-[calc(100%-4rem)] overflow-y-auto scrollbar">
                {messages.map((message, index) => (
                  <div key={index} className="mb-2 p-2 rounded bg-green-500/10">
                    <strong>{message.role === 'user' ? 'USER: ' : 'SYSTEM: '}</strong>
                    {message.content}
                  </div>
                ))}
              </div>
              <form onSubmit={handleChatSubmit} className="absolute bottom-2 left-2 right-2 flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Enter command..."
                  className="flex-grow bg-black/50 border border-green-500/30 p-2 rounded text-green-500 placeholder-green-500/50 text-sm"
                />
                <button type="submit" className="bg-green-500 text-black px-4 py-2 rounded text-sm hover:bg-green-400">
                  Send
                </button>
              </form>
            </div>

            {/* Bottom Panel - System Status */}
            <div className="rounded border border-green-500/30 p-4 relative">
              <div className="absolute top-0 left-0 w-full p-2 text-center border-b border-green-500/30">
                SYSTEM STATUS
              </div>
              <div className="mt-8 h-[calc(100%-3rem)] overflow-y-auto scrollbar">
                {logs.map((log, index) => (
                  <div key={index} className="text-xs mb-1 font-mono text-green-500/70">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-black px-4 text-sm text-green-500/70">
          BRAIN TERMINAL
        </div>
      </motion.div>
    </div>
  )
}

