'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FileText, Book, Award, Scale, Users, Building, Clipboard } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import Image from 'next/image'
import { getRandomPlaceholderImage } from '@/utils/imageUtils'

const reraImages = Array(6).fill(null).map(() => getRandomPlaceholderImage());

const reraSections = [
  {
    title: "Introduction to RERA",
    icon: FileText,
    description: "Comprehensive explanation of RERA's role in regulating Dubai's real estate market.",
    link: "/rera-information/introduction",
  },
  {
    title: "Legal Framework",
    icon: Scale,
    description: "Key laws governing real estate in Dubai, including their purpose and real-life examples.",
    link: "/rera-information/legal-framework",
  },
  {
    title: "RERA Registration Process",
    icon: Clipboard,
    description: "Steps to register as a real estate professional, including eligibility and requirements.",
    link: "/rera-information/registration-process",
  },
  {
    title: "RERA Exam Details",
    icon: Award,
    description: "Information about the RERA exam structure, topics covered, and preparation materials.",
    link: "/rera-information/exam-details",
  },
  {
    title: "Code of Ethics",
    icon: Users,
    description: "Core principles of professional conduct and ethical guidelines for real estate professionals.",
    link: "/rera-information/code-of-ethics",
  },
  {
    title: "Brokerage Regulations",
    icon: Book,
    description: "Responsibilities of brokers, compliance requirements, and potential penalties.",
    link: "/rera-information/brokerage-regulations",
  },
  {
    title: "Property Management Standards",
    icon: Building,
    description: "Duties and legal obligations for property managers in Dubai.",
    link: "/rera-information/property-management",
  }
]

export default function RERAInformationPage() {
  const [progress, setProgress] = useState<Record<string, number>>({})
  const router = useRouter()

  useEffect(() => {
    const mockProgress = reraSections.reduce((acc, section) => {
      acc[section.title] = Math.floor(Math.random() * 101)
      return acc
    }, {} as Record<string, number>)
    setProgress(mockProgress)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gold">RERA Information</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reraSections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div
              onClick={() => router.push(section.link)}
              className="cursor-pointer"
            >
              <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={reraImages[index % reraImages.length]}
                    alt={section.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 transform hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <CardHeader>
                      <CardTitle className="flex items-center text-white">
                        <section.icon className="w-6 h-6 mr-2" />
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                  </div>
                </div>
                <CardContent className="flex-grow p-4">
                  <p className="mb-4 text-sm">{section.description}</p>
                  <div className="mt-auto">
                    <p className="text-sm text-gray-600 mb-1">Progress: {progress[section.title] || 0}%</p>
                    <Progress value={progress[section.title] || 0} className="w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

