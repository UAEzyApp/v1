'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ProgressTracker } from '@/components/ProgressTracker'
import { UserIcon, MapPin, FileText, Trophy } from 'lucide-react'
import Image from 'next/image'

export default function HomePage() {
  const router = useRouter()
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 150])

  const [userName, setUserName] = useState('User')

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    if (!isLoggedIn) {
      router.push('/')
    }
    setUserName('John')
  }, [router])

  const quickLinks = [
    { title: "Dubai Area Knowledge", icon: MapPin, link: "/area-knowledge", description: "Explore key areas and property insights in Dubai's real estate market." },
    { title: "RERA Information", icon: FileText, link: "/rera-information", description: "Learn about Dubai's real estate regulations and compliance requirements." },
    { title: "Daily Challenges", icon: Trophy, link: "/daily-challenges", description: "Test your knowledge and improve your skills with daily quizzes." }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="relative h-[80vh] overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('http://uaezy.com/wp-content/uploads/2024/12/aerial-view-pool-scaled.jpg')",
              y: y1
            }}
          />
          <div className="absolute inset-0 bg-black opacity-50" />
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="container mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-center mb-4">
                  <UserIcon className="w-8 h-8 text-white mr-2" />
                  <p className="text-xl text-white">Welcome back, {userName}!</p>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                  Start Exploring Dubai Real Estate with Confidence
                </h1>
                <p className="text-xl mb-8 text-white">
                  Track your progress, expand your knowledge, and dominate Dubai's real estate market.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    onClick={() => router.push('/area-knowledge')}
                    className="bg-gold hover:bg-gold/80 text-white px-6 py-3 rounded-full text-lg font-semibold"
                  >
                    Explore Area Knowledge
                  </Button>
                  <Button 
                    onClick={() => router.push('/rera-information')}
                    className="bg-white text-gold hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-semibold"
                  >
                    RERA Information
                  </Button>
                  <Button 
                    onClick={() => router.push('/progress')}
                    className="bg-gold hover:bg-gold/80 text-white px-8 py-3 rounded-full text-lg font-semibold"
                  >
                    View Your Progress
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Your Progress</h2>
            <div className="max-w-2xl mx-auto">
              <ProgressTracker />
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-gold">Quick Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card 
                    className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer"
                    onClick={() => router.push(link.link)}
                  >
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <link.icon className="w-12 h-12 text-gold mb-4" />
                      <h3 className="text-xl font-semibold mb-2">{link.title}</h3>
                      <p className="text-gray-600">{link.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

