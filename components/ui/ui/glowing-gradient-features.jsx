'use client'

import { motion } from 'framer-motion'
import { Smartphone, Zap, Sliders, Calendar, BarChart3, Shield, MessageSquare } from 'lucide-react'
import SparklesText from '@/components/ui/magicui/SparklesText'
import {BorderBeam} from '@/components/ui/magicui/BorderBeam'
// import {HyperText} from '../magicui/HyperText'
import {LetterPullup} from '@/components/ui/magicui/LetterPullUp'

const features = [
  {
    icon: Smartphone,
    title: 'Responsive Design',
    description: 'Seamless user experience optimized for mobile and desktop devices.',
  },
  {
    icon: Zap,
    title: 'AI-Driven Content Creation',
    description: 'Generate stunning images and engaging captions powered by AI.',
  },
  {
    icon: Sliders,
    title: 'Customizable Content',
    description: 'Personalize your posts with options for style, tone, and image enhancements.',
  },
  {
    icon: Calendar,
    title: 'Multi-Platform Scheduling',
    description: 'Easily schedule posts across platforms like Instagram, LinkedIn, and Twitter.',
  },
  {
    icon: BarChart3,
    title: 'Performance Analytics',
    description: 'Get detailed insights into engagement, reach, and audience growth.',
  },

  {
    icon: MessageSquare,
    title: 'Rapid Post Publishing',
    description: 'Create and publish posts with speed and accuracy, saving you time.',
  },
]

export default function GlowingGradientFeatures() {
  return (
    <section className="relative overflow-hidden bg-black px-4 sm:px-6 lg:px-8 py-20 mb-25">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC41MCIvPjwvc3ZnPg==')] opacity-20"></div>
      </div>
      <motion.div
        className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold text-white sm:text-5xl text-center mb-16 relative z-10"
        >
          Powerful Features for <span className="text-yellow-400"> <SparklesText text="Social Media Mastery" /> </span> 
        </motion.h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <div className="relative bg-gray-800 bg-opacity-50 rounded-xl p-6 h-full flex flex-col items-center text-center overflow-hidden backdrop-filter backdrop-blur-sm border border-gray-700">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-4 relative z-10"
                >
                  <feature.icon className="w-8 h-8 text-blue-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2 relative z-10"> 
                    {feature.title}
                </h3>
                <p className="text-gray-300 relative z-10">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
        <BorderBeam size={350} duration={10} delay={9}/>
    </section>
  )
}
