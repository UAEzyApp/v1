'use client'

import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { getRandomPlaceholderImage } from '@/utils/imageUtils'
import { AreaNavigation } from '@/components/AreaNavigation'

const areaData = {
  'dubai-marina': {
    name: "Dubai Marina",
    image: "http://uaezy.com/wp-content/uploads/2024/12/dubai-marina-scaled.jpg",
    description: "Dubai Marina is a vibrant waterfront community known for its luxury high-rise apartments, stunning views, and bustling lifestyle. This prestigious neighborhood offers an unparalleled living experience with its scenic waterfront promenade, world-class dining, and exceptional amenities.",
    subcategories: [
      {
        title: "Property Trends",
        description: "Explore the latest buying and rental trends in this area.",
        icon: "📈"
      },
      {
        title: "Off-Plan Developments",
        description: "Learn about upcoming projects and investment opportunities.",
        icon: "🏗️"
      },
      {
        title: "Lifestyle & Culture",
        description: "Discover what makes this area unique and vibrant.",
        icon: "🌟"
      },
      {
        title: "Schools & Facilities",
        description: "Find nearby schools, healthcare, and other facilities.",
        icon: "🏫"
      }
    ]
  },
  'downtown-dubai': {
    name: "Downtown Dubai",
    image: "http://uaezy.com/wp-content/uploads/2024/12/aerial-view-downtown-dubai-autumn-day-united-arab-emirates.jpg",
    description: "Downtown Dubai is the city's bustling central district, home to iconic landmarks like the Burj Khalifa and Dubai Mall. This area offers a perfect blend of residential, commercial, and entertainment spaces, making it a highly sought-after location for both living and investing.",
    subcategories: [
      {
        title: "Iconic Landmarks",
        description: "Explore the famous attractions in Downtown Dubai.",
        icon: "🏙️"
      },
      {
        title: "Luxury Real Estate",
        description: "Discover high-end residential options in the area.",
        icon: "🏠"
      },
      {
        title: "Entertainment Hub",
        description: "Learn about the vibrant nightlife and cultural scene.",
        icon: "🎭"
      },
      {
        title: "Business District",
        description: "Understand the commercial landscape of Downtown Dubai.",
        icon: "💼"
      }
    ]
  },
  // Add more areas as needed
}

export default function AreaPage() {
  const params = useParams()
  const router = useRouter()
  const areaSlug = params.area as string
  const data = areaData[areaSlug as keyof typeof areaData]

  if (!data) {
    return <div>Area not found</div>
  }

  const breadcrumbItems = [
    { label: 'Area Knowledge', href: '/area-knowledge' },
    { label: data.name, href: `/area-knowledge/${areaSlug}` },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <AreaNavigation items={breadcrumbItems} />
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-[400px] w-full mb-6">
                <Image
                  src={data.image}
                  alt={data.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                  priority
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = getRandomPlaceholderImage();
                  }}
                />
              </div>
              <h1 className="text-4xl font-bold mb-4 text-gold">{data.name}</h1>
              <p className="text-lg text-gray-700 mb-6">{data.description}</p>
              <Button 
                onClick={() => router.push(`${areaSlug}/test`)}
                className="w-full bg-gold hover:bg-gold/80 text-white py-3 text-lg rounded-full"
              >
                Area Test
              </Button>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl font-bold mb-6 text-gold">Explore {data.name}</h2>
            <div className="grid gap-4">
              {data.subcategories.map((subcategory, index) => (
                <motion.div
                  key={subcategory.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="transition-all duration-300 hover:shadow-lg cursor-pointer border-2 hover:border-gold"
                    onClick={() => router.push(`/area-knowledge/${areaSlug}/${subcategory.title.toLowerCase().replace(/\s+/g, '-')}`)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{subcategory.icon}</span>
                        <h3 className="text-xl font-semibold">{subcategory.title}</h3>
                      </div>
                      <p className="text-gray-600">{subcategory.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

