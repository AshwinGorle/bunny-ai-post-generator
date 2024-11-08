"use client";
import React, { useState, useEffect } from "react";
import SearchSection from "./_components/SearchSection";
import TemplateListSection from "./_components/TemplateListSection";
import Image from "next/image";

function Dashboard() {
  const [userSearchInput, setUserSearchInput] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [closing, setClosing] = useState<boolean>(false);

  // Close popup when the user closes the browser window
  useEffect(() => {
    const handleWindowClose = () => {
      localStorage.removeItem("popupShown");
    };
    window.addEventListener("beforeunload", handleWindowClose);
    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
    };
  }, []);

  // Check if popup has been shown before
  useEffect(() => {
    const popupShown = localStorage.getItem("popupShown");
    if (!popupShown) {
      setShowPopup(true);
      localStorage.setItem("popupShown", "true");

      // Automatically close the popup after 3 seconds
      const timeout = setTimeout(() => {
        handleClosePopup();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, []);

  // Function to close the popup with animation
  const handleClosePopup = () => {
    setClosing(true);
    setTimeout(() => setShowPopup(false), 300); // Delay to allow animation to finish
  };

  return (
    <div className="relative min-h-screen">
      {/* Popup Overlay */}
      {showPopup && (
        <div
          className={`fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${closing ? "opacity-0" : "opacity-100"}`}
        >
          {/* Popup Box with Scale-Down Animation */}
          <div
            className={`relative flex w-[90%] max-w-[50%] h-[30%] max-h-[40%] md:w-1/2 md:h-2/5 rounded-lg border border-white shadow-[0_0_10px_4px_rgba(255,255,255,0.5)] bg-black overflow-hidden transform transition-transform duration-600 ease-in-out ${closing ? "scale-90 opacity-0" : "scale-100 opacity-100"}`}
          >
            {/* Left Image Section */}
            <div className="w-1/2 h-full">
              <Image
                src="https://res.cloudinary.com/dpgj9mrly/raw/upload/v1731043162/CRM/profile/client/671e5b32864fce0e937a56cb.jpg"
                alt="Popup Image"
                layout="fill"
                objectFit="cover"
              />
            </div>

            {/* Right Text Section */}
            <div className="relative flex flex-col items-center justify-center w-1/2 p-4 bg-black rounded-r-lg">
              <h2 className="text-xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-pulse">
                Welcome To
              </h2>
              <h2 className="text-xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-pulse">
                Bunny
              </h2>

              {/* Close Button */}
              <button
                onClick={handleClosePopup}
                className="absolute top-1 right-1 p-1 text-white bg-gray-800 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Dashboard Content */}
      <div className={`relative ${showPopup ? "blur-sm pointer-events-none" : ""}`}>
        {/* Search Section */}
        <SearchSection onSearchInput={(value: string) => setUserSearchInput(value)} />

        {/* Template List Section */}
        <TemplateListSection userSearchInput={userSearchInput} />
      </div>
    </div>
  );
}

export default Dashboard;
