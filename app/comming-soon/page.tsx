'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Component() {
  const [isAdded, setIsAdded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const handleWaitlistClick = () => {
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-black text-white">
      {/* Dynamic background glow effect */}
      <div
        className="absolute inset-0 bg-gradient-to-br black black opacity-20 blur-3xl"
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
        }}
      />

      <div className="relative z-10 text-center space-y-8 p-4 max-w-4xl">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          Hop Into the Future of Social Media!
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-300 font-medium"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
        >
          Our upcoming post generator and scheduler is designed to save you time, boost engagement, and streamline your social media strategy across platforms—all from one intuitive dashboard.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button
            className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full text-white font-bold text-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 shadow-lg hover:shadow-xl hover:shadow-purple-500/30"
            onClick={handleWaitlistClick}
          >
            {isAdded ? "You're in the burrow!" : "Join the Bunny Brigade"}
          </button>
        </motion.div>

        {/* Animated features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            { title: 'Rapid Posting', icon: '🐰' },
            { title: 'Carrot-Powered Engagement', icon: '🥕' },
            { title: 'Burrow-wide Reach', icon: '🌿' }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg border border-gray-800"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            >
              <div className="text-4xl mb-2">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-pink-400">{feature.title}</h3>
              <p className="text-gray-400">Experience the power of rabbit-fast social media management.</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animated bunny silhouettes */}
      <AnimatePresence>
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            exit={{ scale: 0 }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9c.83 0 1.5-.67 1.5-1.5S7.83 8 7 8s-1.5.67-1.5 1.5S6.17 11 7 11zm5-3c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm5 3c.83 0 1.5-.67 1.5-1.5S17.83 8 17 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5z"/>
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
