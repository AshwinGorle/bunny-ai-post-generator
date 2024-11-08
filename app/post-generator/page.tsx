"use client";

import React, { useState } from "react";
import { chatSession } from '@/utils/AiModal'
import axios from "axios";
import Image from "next/image";

export default function PostGenerator() {
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([
    
  ]);
  const [caption, setCaption] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>("");

  const handleGenerate = async () => {
    setLoading(true);
    setImages([]);
    setCaption("");

    try {
      // Unsplash API for images
      const unsplashResponse = await axios.get("https://api.unsplash.com/search/photos", {
        params: {
          query: prompt,
          per_page: 4,
          orientation: "landscape"
        },
        headers: {
          Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
        }
      });

      const imageUrls = unsplashResponse.data.results.map((image: any) => image.urls.regular);
      setImages(imageUrls);

      // Gemini API for caption
      // const geminiResponse = await axios.post(
      //   "https://gemini.googleapis.com/v1/generateCaption",
      //   { prompt }, // assuming this is the required format for Gemini
      //   {
      //     headers: {
      //       Authorization: `Bearer ${process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY}`
      //     }
      //   }
      // );
      
     
        const FinalAIPrompt = prompt + ", " + "Generate only one instagram post caption in the given context";
        const result = await chatSession.sendMessage(FinalAIPrompt);
        
        setCaption(result?.response.text());
    

      // setCaption(geminiResponse.data.caption); // assuming `caption` is the response field

    } catch (error) {
      console.error("Error fetching images or caption:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(caption);
    alert("Caption copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-200">AI Post Generator</h1>

      <textarea
        className="w-full max-w-lg p-4 mb-4 text-gray-200 bg-[#1e1e1e] border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
        placeholder="Enter your prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
      ></textarea>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className={`px-6 py-2 rounded-md text-lg font-semibold ${
          loading
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600"
        }`}
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {/* Display Caption */}
      {caption && (
        <div className="mt-4 w-full max-w-3xl p-4 bg-[#1e1e1e] text-lg text-gray-300 border border-gray-600 rounded-md flex justify-between items-center">
          <span>{caption}</span>
          <button
            onClick={handleCopyCaption}
            className="ml-4 px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 rounded-md text-white"
          >
            Copy
          </button>
        </div>
      )}

      {/* Display Images */}
      {images.length > 0 && (
        <div className="mt-8 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 p-10 bg-[#121212] rounded-md">
          {images.map((image, index) => (
            <div
              key={index}
              className={`rounded-lg overflow-hidden border-2 cursor-pointer ${
                selectedImage === image
                  ? "border-blue-500 shadow-[0_0_10px_4px_rgba(0,191,255,0.6)]"
                  : "border-transparent"
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
          ))}
        </div>
      )}
    </div>
  );
}
