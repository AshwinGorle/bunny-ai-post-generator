// src/components/CustomCursor.jsx
"use client";
import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [trailPos, setTrailPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setTrailPos({ x: e.clientX, y: e.clientY }); // Update trail position immediately
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrailPos((prev) => {
        const xDiff = mousePos.x - prev.x;
        const yDiff = mousePos.y - prev.y;
        const newX = prev.x + xDiff * 5; // Adjust this factor for lag effect
        const newY = prev.y + yDiff * 6; // Adjust this factor for lag effect
        return { x: newX, y: newY };
      });
    }, 16); // Roughly 60fps

    return () => clearInterval(interval);
  }, [mousePos]);

  return (
    <>
      <div
        className="main-cursor"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      />
      <div
        className="trail-cursor"
        style={{
          left: `${trailPos.x}px`,
          top: `${trailPos.y}px`,
        }}
      />
    </>
  );
};

export default CustomCursor;
