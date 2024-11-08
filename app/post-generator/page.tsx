"use client";

import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function PostGenerator() {
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([
    "https://www.hindustantimes.com/ht-img/img/2024/10/30/1600x900/choti_diwali_wishes_1730275295004_1730275295284.png",
    "https://th.bing.com/th/id/OIP.bKqByVEFi-TUjGufvJf6qQHaHa?w=700&h=700&rs=1&pid=ImgDetMain",
    "https://img.freepik.com/premium-psd/happy-diwali-background_846732-733.jpg",
    "https://th.bing.com/th/id/OIP.dy1jOxTVHu4nuwGObW1qQQHaJ4?w=480&h=640&rs=1&pid=ImgDetMain"
  ]);
  const [caption, setCaption] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>("");

  const handleGenerate = async () => {
    setLoading(true);
    setImages([]);
    setCaption("");

    try {
      // Unsplash API URL and headers
      const response = await axios.get("https://api.unsplash.com/search/photos", {
        params: {
          query: prompt,       // search term
          per_page: 4,         // limit to 4 images
          orientation: "landscape"
        },
        headers: {
          Authorization: `Client-ID ciu0A0apCaJPLYauOdXlZXztXU7ccu_OgEr9Gubr1ZY`, // Updated Access Key
        }
      });
      
      // Extract image URLs from the response
      const imageUrls = response.data.results.map((image: any) => image.urls.regular);
      console.log("images from api : ", imageUrls)
      setImages(imageUrls);
    } catch (error) {
      console.error("Error fetching images from Unsplash:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-200">AI Post Generator</h1>

      {/* Prompt Input */}
      <textarea
        className="w-full max-w-lg p-4 mb-4 text-gray-200 bg-[#1e1e1e] border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
        placeholder="Enter your prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
      ></textarea>

      {/* Generate Button */}
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

      {/* Display Caption */}
      {caption && (
        <div className="mt-4 w-full max-w-3xl p-4 bg-[#1e1e1e] text-lg text-gray-300 border border-gray-600 rounded-md">
          {caption}
        </div>
      )}

      {/* State Values (selected image and caption) */}
      {selectedImage && caption && (
        <div className="mt-4 text-gray-400">
          <p>
            <strong>Selected Image URL:</strong> {selectedImage}
          </p>
          <p>
            <strong>Caption:</strong> {caption}
          </p>
        </div>
      )}
    </div>
  );
}
