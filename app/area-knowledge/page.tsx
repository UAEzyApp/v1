'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { areaData } from '@/app/data/areaData'

export default function AreaKnowledge() {
  const router = useRouter()
  const areas = Object.entries(areaData)

  const handleAreaClick = (slug: string) => {
    router.push(`/area-knowledge/${slug}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gold">Dubai Area Knowledge</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {areas.map(([slug, area], index) => (
          <motion.div
            key={slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card 
              className="overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer group"
              onClick={() => handleAreaClick(slug)}
            >
              <div className="relative h-48">
                <Image
                  src={area.image}
                  alt={area.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 transform group-hover:scale-110"
                />
              </div>
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">{area.name}</h2>
                <p className="mb-4 text-sm text-gray-600 line-clamp-2">{area.description}</p>
                <div 
                  className="w-full bg-gold text-white py-2 text-center rounded-md transition-colors duration-300 group-hover:bg-gold/80"
                >
                  Explore Area
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

