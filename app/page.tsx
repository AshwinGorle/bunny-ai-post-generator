"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the dashboard after 400ms
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 1000);

    // Clear the timer if the component unmounts before the redirect
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-pulse">
        Welcome to Bunny
      </h1>
    </div>
  );
}
