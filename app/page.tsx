import { HeroParallax } from "@/components/ui/ui/hero-parallax";
import Image from "next/image";
// import HeroSection from "@/components/ui/ui/HeroSection"
import HeroSection from '@/components/ui/ui/HeroSection'
import { HoverEffect } from "@/components/ui/ui/card-hover-effect";
import GlowingGradientFeature from "@/components/ui/ui/glowing-gradient-features";
// import FAQSection from "../components/ui/ui/FAQSectionOld";
import {FAQSection} from '@/components/ui/ui/FAQSection';
import {VelocityScroll} from "@/components/ui/magicui/VelocityScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import HomepageEnding from "@/components/ui/ui/HomepageEnding";

// import {TracingBeam} from "../components/ui/ui/tracing-beam";

// export const projects = [
//   {
//     title: "One-Click Post Generation",
//     description:
//       "Instantly generate stunning, platform-ready posts with just a single click. No design skills required!",
//     link: "#",
//   },
//   {
//     title: "AI-Powered Caption Creation",
//     description:
//       "Generate creative and engaging captions tailored to your brand's voice, making your posts stand out.",
//     link: "#",
//   },
//   {
//     title: "Seamless Image Generation",
//     description:
//       "Produce high-quality, eye-catching images for your content without the need for a photographer or designer.",
//     link: "#",
//   },
//   {
//     title: "Unified Social Media Management",
//     description:
//       "Manage all your social media accounts from one dashboard, streamlining your content distribution.",
//     link: "#",
//   },
//   {
//     title: "Automated Cross-Platform Sharing",
//     description:
//       "Effortlessly publish posts across multiple platforms simultaneously, saving time and maximizing reach.",
//     link: "#",
//   },
//   {
//     title: "Content Calendar & Scheduling",
//     description:
//       "Plan, organize, and schedule posts ahead of time to ensure a consistent and strategic online presence.",
//     link: "#",
//   },
// ];


export default function Home() {
  return (
    <>
      <CustomCursor />
      <HeroSection/>
    
      <GlowingGradientFeature />

      <VelocityScroll
      text="Boost Your Socials! 🚀"
      default_velocity={5}
      className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-yellow-400 md:text-7xl md:leading-[5rem]"
      />
      <FAQSection />
      <HomepageEnding />
    </>
  );
}


