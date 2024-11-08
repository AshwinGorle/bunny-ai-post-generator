'use client'

import React, { useState } from "react"
import { chatSession } from '@/utils/AiModal'
import axios from "axios"
import Image from "next/image"
import { useRouter } from 'next/navigation'

export default function PostGenerator() {
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [caption, setCaption] = useState("")
  const [selectedImage, setSelectedImage] = useState("")
  const router = useRouter();

  
  const handleGenerate = async () => {
    setLoading(true)
    setImages([])
    setCaption("")

    try {
      const unsplashResponse = await axios.get("https://api.unsplash.com/search/photos", {
        params: {
          query: prompt,
          per_page: 4,
          orientation: "landscape"
        },
        headers: {
          Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
        }
      })

      const imageUrls = unsplashResponse.data.results.map((image: any) => image.urls.regular)
      setImages(imageUrls)

      const FinalAIPrompt = prompt + ", " + "Generate only one instagram post caption in the given context"
      const result = await chatSession.sendMessage(FinalAIPrompt)

      setCaption(result?.response.text())
    } catch (error) {
      console.error("Error fetching images or caption:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectImage = (imageUrl: string) => {
    setSelectedImage(imageUrl)
  }

  const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value)
  }

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(caption)
    alert("Caption copied to clipboard!")
  }

  const handleCreatePost = () => {
    console.log("Selected Image:", selectedImage)
    console.log("Caption:", caption)
    router.push(`/publish-post?url=${selectedImage}&caption=${caption}`);
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 space-y-8">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse mb-8">
        AI Post Generator
      </h1>

      <div className="w-full max-w-2xl flex flex-col space-y-6">
        <div className="w-full bg-[#1e1e1e] border border-gray-600 rounded-lg p-4 transition-all duration-300 ease-in-out">
            <textarea
              className="w-full p-2 text-gray-200 bg-[#121212] border border-gray-600 rounded-md focus:outline-none focus:border-blue-500 resize-none transition-all duration-300 ease-in-out"
              placeholder="Enter your prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
            />

            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`w-full mt-2 py-2 px-4 rounded-md text-white font-semibold transition-all duration-300 ease-in-out ${
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
                  Generating...
                </span>
              ) : (
                "Generate"
              )}
            </button>
          </div>

          <div className="w-full bg-[#1e1e1e] border border-gray-600 rounded-lg p-4 transition-all duration-300 ease-in-out">
            {loading ? (
              <div className="flex items-center justify-center h-24">
                <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : caption ? (
              <div className="space-y-2">
                <textarea
                  className="w-full p-2 bg-[#121212] text-gray-300 border-none focus:outline-none resize-none rounded-md transition-all duration-300 ease-in-out"
                  value={caption}
                  onChange={handleCaptionChange}
                  rows={3}
                />
                <button
                  onClick={handleCopyCaption}
                  className="px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-semibold text-sm transition-all duration-300 ease-in-out"
                >
                  Copy
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-500">Generated caption will appear here</div>
            )}
          </div>
        <div className="w-full bg-[#121212] border border-gray-600 rounded-lg p-4 transition-all duration-300 ease-in-out">
          <div className="grid grid-cols-4 gap-4">
            {loading
              ? Array(4).fill(0).map((_, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden">
                    <div className="w-full h-full bg-gray-700 animate-pulse"></div>
                  </div>
                ))
              : images.length > 0
              ? images.map((image, index) => (
                  <div
                    key={index}
                    className={`aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out ${
                      selectedImage === image
                        ? "ring-2 ring-blue-500 shadow-[0_0_10px_4px_rgba(0,191,255,0.6)]"
                        : "hover:scale-105"
                    }`}
                    onClick={() => handleSelectImage(image)}
                  >
                    <Image
                      src={image}
                      alt={`Generated Image ${index + 1}`}
                      width={250}
                      height={250}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))
              : Array(4).fill(0).map((_, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden">
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
                      Image {index + 1}
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleCreatePost}
        className="mt-6 py-2 px-6 bg-green-500 hover:bg-green-600 text-white rounded-md font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600"
      >
        Create Post
      </button>
    </div>
  )
}