'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
// import { Button } from '@/components/ui/button' //Removed Button import
import { AuthModal } from '@/components/AuthModal'
import { NavigationCards } from '@/components/NavigationCards'
import { Testimonials } from '@/components/Testimonials'
// import Footer from '@/components/Footer' //Removed Footer import

export default function WelcomePage() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])

  useEffect(() => {
    document.body.style.overflowX = 'hidden'
    return () => {
      document.body.style.overflowX = 'auto'
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <section className="relative h-[90vh] overflow-hidden"> {/* Update 1: Changed height */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('http://uaezy.com/wp-content/uploads/2024/12/pexels-thelazyartist-3307862-2-scaled.jpg')",
            y
          }}
        />
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                Welcome to UAEzy
              </h1>
              <p className="text-xl mb-12 text-white max-w-2xl mx-auto">
                Your Gateway to Dubai Real Estate Success. Master key areas, pass your RERA exams, and gain the confidence to close deals like a pro.
              </p>
              <button 
                onClick={() => setShowAuthModal(true)}
                className="bg-gold hover:bg-gold/80 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Get Started
              </button>
              {/* Update 2: Added scrolling indicator */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="animate-bounce">
                  <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <NavigationCards />
      
      <Testimonials />

      {/* Removed Footer component */}

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  )
}

