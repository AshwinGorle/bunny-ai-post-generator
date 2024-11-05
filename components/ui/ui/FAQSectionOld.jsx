'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    question: 'What is this platform all about? 🤔',
    answer: 'Our platform helps you streamline your social media game! Schedule posts, track analytics, and automate content like a pro! 📈🚀'
  },
  {
    question: 'Can I use this on my phone? 📱',
    answer: 'Absolutely! We’re mobile-friendly, so you can manage everything on the go. Your content, your rules – anywhere, anytime! 📲'
  },
  {
    question: 'How do I schedule posts across multiple platforms? 📅',
    answer: 'Just set it up in our scheduler! Pick your platforms, set the time, and we’ll handle the rest – Facebook, Instagram, Twitter? All covered! 🌐'
  },
  {
    question: 'Can I customize my posts? 🎨',
    answer: 'Totally! With flexible options, you can adjust each post’s design, add emojis, and make it uniquely yours. 🎉'
  },
  {
    question: 'Is there a free trial? 🆓',
    answer: 'Yes! Try all features for free for the first 14 days. No credit card needed – just dive in and explore! 🌟'
  }
]

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="min-h-screen bg-black text-white py-20 px-6 sm:px-8 lg:px-10 ">
      <h2 className="text-4xl font-extrabold text-center mb-10">Frequently Asked Questions 🤔</h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full p-4 flex items-center justify-between text-left bg-gray-800 hover:bg-gray-700"
            >
              <span className="text-lg font-medium">{faq.question}</span>
              <motion.span
                animate={{ rotate: activeIndex === index ? 90 : 0 }}
                className="ml-2"
              >
                ➕
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-900 p-4 text-gray-300"
                >
                  <p>{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      
    </section>
  )
}
