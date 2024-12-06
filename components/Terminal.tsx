'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useChat } from 'ai/react'

export default function Terminal() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
    onResponse: (response) => {
      if (!response.ok) {
        addLog(`Error: ${response.statusText}`)
        return
      }
      addLog(`Receiving reality stream...`)
    },
    onFinish: (message) => {
      addLog(`Reality generation completed`)
    },
    onError: (error) => {
      addLog(`Error: ${error.message}`)
    }
  })

  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [welcomeText, setWelcomeText] = useState<string[]>([''])
  const [showInput, setShowInput] = useState(false)
  const [logs, setLogs] = useState<string[]>([
    "System initialized...",
    "Running diagnostics...",
    "Reality algorithms loaded",
    "Neural interface active",
    "All systems operational"
  ])
  const [seqProgress, setSeqProgress] = useState(0)
  const [seqStatus, setSeqStatus] = useState("ANALYZING")
  const videoRef = useRef<HTMLVideoElement>(null)
  const messageEndRef = useRef<HTMLDivElement>(null)
  const logsEndRef = useRef<HTMLDivElement>(null)
  const seqAnimation = useAnimation()

  const welcomeMessages = [
    "[BOOT SEQUENCE INITIATED]",
    "> Loading Neural Framework... ██████ 100%",
    "> Initializing Reality Algorithm Generator... ██████ 100%",
    "> Connecting to Multiversal Streams...",
    "> Access Granted: User ID [Undefined].",
    "> Welcome to the Brain Terminal.",
    ">>> Playing with Reality Since 2021.",
    "",
    "> This system operates on the edge of existence, where thoughts become code, and code becomes reality.",
    "> Here, imagination fuels creation. You are the architect, and this terminal is your canvas.",
    "",
    "[NOTE]: All actions will be logged in the System Status Panel.",
    "[INFO]: Type a command to start generating reality.",
    "",
    "> Awaiting your command...",
  ]

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }

    // Character-by-character typing effect
    const typingInterval = setInterval(() => {
      if (currentLine < welcomeMessages.length) {
        const currentMessage = welcomeMessages[currentLine]
        
        if (currentChar < currentMessage.length) {
          // Type next character
          setWelcomeText(prev => {
            const newText = [...prev]
            newText[currentLine] = currentMessage.substring(0, currentChar + 1)
            return newText
          })
          setCurrentChar(prev => prev + 1)
        } else {
          // Move to next line
          if (currentLine < welcomeMessages.length - 1) {
            setCurrentLine(prev => prev + 1)
            setCurrentChar(0)
            setWelcomeText(prev => [...prev, ''])
          } else {
            // Finished typing
            setShowInput(true)
            clearInterval(typingInterval)
          }
        }
      }
    }, 30) // Adjust speed here (lower = faster)

    return () => clearInterval(typingInterval)
  }, [currentLine, currentChar])

  // Auto-scroll effect for both chat and logs
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, welcomeText, logs])

  const addLog = (log: string) => {
    setLogs(prevLogs => {
      // Keep only the last 5 logs
      const newLogs = [...prevLogs, `[${new Date().toLocaleTimeString()}] ${log}`]
      return newLogs.slice(-5)
    })
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
    if (!input.trim()) return
    
    try {
      addLog(`Generating new reality...`)
      await handleSubmit(e)
      animateSeq()
    } catch (error) {
      addLog(`Error: Failed to generate reality`)
      console.error('Chat submission error:', error)
    }
  }

  return (
    <div className="h-screen w-screen bg-black text-green-500 p-4 overflow-hidden">
      <div className="absolute top-4 left-4 text-xl font-bold">
        BRAIN TERMINAL v1.0
      </div>
      <div className="absolute top-4 right-4 text-sm">
        PRODUCT OF SCIENCE
      </div>

      <div className="flex h-[calc(100vh-8rem)] mt-16 gap-4 flex-col lg:flex-row">
        {/* Left Panel - 3D Visualization */}
        <div className="w-full lg:w-1/2 rounded border border-green-500/30 p-4 relative h-[300px] lg:h-full">
          <div className="absolute top-0 left-0 w-full p-2 text-center border-b border-green-500/30">
           BRAIN SCAN
          </div>
          <div className="mt-8 h-[calc(100%-3rem)] relative flex items-center justify-center">
            <video
              ref={videoRef}
              className="w-3/4 h-3/4 object-contain opacity-50"
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/video5949276500988532294-sNWpZUcJyPC8ycNA0TMOzutWwvnNhi.mp4"
              muted
              loop
              playsInline
            />
            <div className="absolute bottom-4 left-4 text-xs">
              <div>STATUS: ACTIVE</div>
              <div>SIGNAL: STRONG</div>
            </div>
          </div>
        </div>

        {/* Right Panels Grid */}
        <div className="w-full lg:w-1/2 grid grid-rows-[auto_1fr_auto] gap-4 h-[calc(100vh-24rem)] lg:h-full">
          {/* Top Panel - DNA Blood Analysis */}
          <div className="rounded border border-green-500/30 p-4 relative h-[100px] lg:h-[120px]">
            <div className="absolute top-0 left-0 w-full p-2 text-center border-b border-green-500/30">
              ANALYSIS
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

          {/* Middle Panel - Chat */}
          <div className="rounded border border-green-500/30 p-4 relative flex flex-col min-h-0">
            <div className="absolute top-0 left-0 w-full p-2 text-center border-b border-green-500/30">
              GENERATE REALITY
            </div>
            <div className="flex-1 mt-8 overflow-y-auto scrollbar">
              {/* Welcome sequence */}
              {welcomeText.map((line, index) => (
                <div key={`welcome-${index}`} className="mb-2 p-2 font-mono text-green-500/90">
                  {line}
                </div>
              ))}
              
              {/* Chat messages */}
              {showInput && messages.map((message, index) => (
                <div key={`message-${index}`} className="mb-2 p-2 rounded bg-green-500/10 break-words">
                  <strong>{message.role === 'user' ? 'USER: ' : 'SYSTEM: '}</strong>
                  {message.content}
                </div>
              ))}
              {error && (
                <div className="mb-2 p-2 rounded bg-red-500/10 text-red-500 break-words">
                  Error: Failed to generate reality. Please try again.
                </div>
              )}
              <div ref={messageEndRef} />
            </div>
            {showInput && (
              <form onSubmit={handleChatSubmit} className="mt-2 flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Enter command..."
                  className="flex-grow min-w-0 bg-black/50 border border-green-500/30 p-2 rounded text-green-500 placeholder-green-500/50 text-sm"
                  disabled={isLoading}
                />
                <button 
                  type="submit" 
                  className="bg-green-500 text-black px-4 py-2 rounded text-sm hover:bg-green-400 whitespace-nowrap"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Send'}
                </button>
              </form>
            )}
          </div>

          {/* Bottom Panel - System Status */}
          <div className="rounded border border-green-500/30 p-4 relative h-[100px] lg:h-[120px]">
            <div className="absolute top-0 left-0 w-full p-2 text-center border-b border-green-500/30">
              SYSTEM STATUS
            </div>
            <div className="mt-8 h-[calc(100%-3rem)] overflow-y-auto scrollbar">
              {logs.map((log, index) => (
                <div key={index} className="text-xs mb-1 font-mono text-green-500/70">
                  {log}
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
