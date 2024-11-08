'use client'

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import SearchSection from "./_components/SearchSection"
import TemplateListSection from "./_components/TemplateListSection"

export default function Dashboard() {
  const [userSearchInput, setUserSearchInput] = useState<string>("")
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [showNewContent, setShowNewContent] = useState<boolean>(false)

  const [text] = useTypewriter({
    words: ["Welcome aboard, ! 🐰✨\n\nI'm Bunny, your new social media sidekick, and trust me, I'm all ears for whatever you need! 😆 Whether you're here to level up your socials or just chill with an AI rabbit who's got the hoppin' tips for going viral, you're in the right place!\n\nSo buckle up – or should I say, hop right in! – and let's make some social media magic together. 🪄🐇\n\n(And don't worry, I promise not to eat all your carrots… just a few! 🥕)"],
    loop: 1,
    typeSpeed: 10,
    deleteSpeed: 10,
  })

  useEffect(() => {
    const popupShown = localStorage.getItem("popupShown")
    if (!popupShown) {
      const showPopupTimeout = setTimeout(() => {
        setShowPopup(true)
        localStorage.setItem("popupShown", "true")
      }, 500)

      const showNewContentTimeout = setTimeout(() => {
        setShowNewContent(true)
      }, 3000)

      const closePopupTimeout = setTimeout(() => {
        handleClosePopup()
      }, 15000)

      return () => {
        clearTimeout(showPopupTimeout)
        clearTimeout(showNewContentTimeout)
        clearTimeout(closePopupTimeout)
      }
    }
  }, [])

  useEffect(() => {
    const handleWindowClose = () => {
      localStorage.removeItem("popupShown")
    }
    window.addEventListener("beforeunload", handleWindowClose)
    return () => {
      window.removeEventListener("beforeunload", handleWindowClose)
    }
  }, [])

  const handleClosePopup = () => {
    setShowPopup(false)
    setShowNewContent(false)
  }

  return (
    <div className="relative min-h-screen">
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white/10 shadow-xl backdrop-blur-md"
            >
              <AnimatePresence mode="wait">
                {!showNewContent ? (
                  <motion.div
                    key="initial-content"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex"
                  >
                    <div className="relative w-2/5 overflow-hidden">
                      <Image
                        src="https://res.cloudinary.com/dpgj9mrly/raw/upload/v1731043162/CRM/profile/client/671e5b32864fce0e937a56cb.jpg"
                        alt="Popup Image"
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center w-3/5 p-6 text-white">
                      <h2 className="mb-2 text-3xl font-bold">Welcome To</h2>
                      <h1 className="mb-4 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        Bunny
                      </h1>
                      <p className="text-center text-white/80">
                        Discover a world of possibilities with our innovative platform.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="new-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6 text-white"
                  >
                    <div className="h-[400px] overflow-y-auto">
                      <p className="whitespace-pre-line">
                        {text}
                        <Cursor cursorStyle='_' />
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={handleClosePopup}
                className="absolute top-2 right-2 p-1 text-white/80 hover:text-white focus:outline-none"
                aria-label="Close popup"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={showPopup ? "filter blur-sm pointer-events-none" : ""}>
        <SearchSection onSearchInput={(value: string) => setUserSearchInput(value)} />
        <TemplateListSection userSearchInput={userSearchInput} />
      </div>
    </div>
  )
}