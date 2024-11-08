'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

interface Message {
  type: 'success' | 'error'
  text: string
}

export default function PublishPost() {
  const searchParams = useSearchParams()
  const caption = searchParams.get('caption') || ''
  const url = searchParams.get('url') || ''
  const pageId = '502967012891563'
  // const accessToken = 'EAASFaN7CjxoBO8yK5KFqoFijWGbNJ1nfZAeWIBk7BCyb45NcCdooTPBIWvtdixDxHmEdrwKiLWNoOu46Q3MSEFjshgIeSSekviT8O5koDYchSk3JvbNVqD0c20FUZAdneqsnDZBx1eKUzth3TbvVPk6PAqZAosNtKLvkZCdmqcLEz9fj5iZCSbM4mShhlOAPD31ZBD5PuEuebzNNZBneultIYQMlNbEo3Yve'
  const accessToken = 'EAASFaN7CjxoBOwJWmEPLe5R7DkcYs9GKvV0LVfZCNhZCFEJTMS959gsmC0pY9NRCrBTD7BqlDzlA6v4BsN4RqEZBDS2o4rMUK0LZBTP5wnTEtwh92Ld38kHXpKiu66lsIm15ZC05TVzoNBZBlryiIvWx5FAWA0BeFEuxAyjiZBWWQMFNS07hSTKpDp6ukB0fmkhZCEUiZCMPX'

  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<Message | null>(null)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [isScheduling, setIsScheduling] = useState<boolean>(false)
  const [scheduledDate, setScheduledDate] = useState<string>('')

  const handlePublishNow = async (): Promise<void> => {
    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch(`https://graph.facebook.com/${pageId}/photos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          caption,
          access_token: accessToken,
        }),
      })

      const data = await response.json()

      if (data.id) {
        setMessage({ type: 'success', text: 'Post published successfully!' })
      } else {
        setMessage({ type: 'error', text: `Error: ${data.error.message || 'Unable to publish post.'}` })
      }
    } catch (error) {
      setMessage({ type: 'error', text: `Error: ${(error as Error).message || 'Network error occurred.'}` })
    } finally {
      setLoading(false)
      setShowModal(false)
    }
  }

  const handleSchedulePost = async (): Promise<void> => {
    if (!scheduledDate) return

    setLoading(true)
    setMessage(null)

    const scheduledTimestamp = Math.floor(new Date(scheduledDate).getTime() / 1000)

    try {
      const response = await fetch(`https://graph.facebook.com/${pageId}/photos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          caption,
          published: false,
          scheduled_publish_time: scheduledTimestamp,
          access_token: accessToken,
        }),
      })

      const data = await response.json()

      if (data.id) {
        setMessage({ type: 'success', text: 'Post scheduled successfully!' })
      } else {
        setMessage({ type: 'error', text: `Error: ${data.error.message || 'Unable to schedule post.'}` })
      }
    } catch (error) {
      console.log(error)
      setMessage({ type: 'error', text: `Error: ${(error as Error).message || 'Network error occurred.'}` })
    } finally {
      setLoading(false)
      setShowModal(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 space-y-8">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse mb-8">
        Publish Post
      </h1>

      <div className="w-full max-w-2xl flex flex-col space-y-6">
        <div className="w-full bg-[#1e1e1e] border border-gray-600 rounded-lg p-4 transition-all duration-300 ease-in-out">
          <img src={url} alt="Post Preview" className="w-full h-64 object-cover rounded-lg mb-4" />
          <textarea
            className="w-full p-2 text-gray-200 bg-[#121212] border border-gray-600 rounded-md focus:outline-none focus:border-blue-500 resize-none transition-all duration-300 ease-in-out"
            value={caption}
            readOnly
            rows={3}
          />
          <button
            onClick={() => setShowModal(true)}
            disabled={loading}
            className={`w-full mt-4 py-2 px-4 rounded-md text-white font-semibold transition-all duration-300 ease-in-out ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Publishing...
              </span>
            ) : (
              "Publish"
            )}
          </button>
        </div>

        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`w-full p-4 rounded-lg text-center ${
                message.type === 'success' ? 'bg-green-600' : 'bg-red-600'
              }`}
            >
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#1e1e1e] p-8 rounded-lg max-w-md w-full shadow-2xl border border-gray-600"
            >
              <h3 className="text-2xl font-semibold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Publish Options
              </h3>
              <div className="flex justify-around mb-6">
                <button
                  onClick={() => {
                    setIsScheduling(false)
                    handlePublishNow()
                  }}
                  className="py-2 px-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Publish Now
                </button>
                <button
                  onClick={() => setIsScheduling(true)}
                  className="py-2 px-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Schedule
                </button>
              </div>

              <AnimatePresence>
                {isScheduling && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6"
                  >
                    <label htmlFor="scheduledDate" className="block text-lg font-medium mb-3 text-gray-300">
                      Select Date and Time:
                    </label>
                    <input
                      type="datetime-local"
                      id="scheduledDate"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="w-full p-3 bg-[#121212] rounded-md text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
                    />
                    <button
                      onClick={handleSchedulePost}
                      disabled={!scheduledDate || loading}
                      className={`mt-6 w-full py-2 px-4 rounded-md text-white font-semibold transition-all duration-300 ease-in-out ${
                        !scheduledDate || loading
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 transform hover:scale-105"
                      }`}
                    >
                      {loading ? "Scheduling..." : "Schedule Post"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => setShowModal(false)}
                className="mt-6 w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md font-semibold transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}