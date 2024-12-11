'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { AreaNavigation } from '@/components/AreaNavigation'
import { areaData, articleData } from '@/app/data/areaData'

export default function SubcategoryPage() {
  const params = useParams()
  const areaSlug = params.area as string
  const subcategorySlug = params.subcategory as string
  const router = useRouter()

  const area = areaData[areaSlug as keyof typeof areaData]
  const articles = articleData[areaSlug as keyof typeof articleData]?.[subcategorySlug as keyof (typeof articleData)[typeof areaSlug]] || []

  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 4
  const indexOfLastArticle = currentPage * articlesPerPage
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle)

  const breadcrumbItems = [
    { label: 'Area Knowledge', href: '/area-knowledge' },
    { label: area?.name || areaSlug, href: `/area-knowledge/${areaSlug}` },
    { 
      label: area?.subcategories.find(s => s.title.toLowerCase().replace(/\s+/g, '-') === subcategorySlug)?.title || subcategorySlug,
      href: `/area-knowledge/${areaSlug}/${subcategorySlug}` 
    },
  ]

  if (!area) {
    return <div>Area not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AreaNavigation items={breadcrumbItems} />
      <h1 className="text-3xl font-bold mb-8 text-gold capitalize">
        {area.subcategories.find(s => s.title.toLowerCase().replace(/\s+/g, '-') === subcategorySlug)?.title || subcategorySlug}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {currentArticles.map((article, index) => (
          <motion.div
            key={article.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col">
              <div className="relative h-48">
                <Image
                  src={article.image}
                  alt={article.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <CardContent className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                  <p className="text-sm text-gray-600 mb-4">{article.excerpt}</p>
                </div>
                <div className="flex justify-between items-center">
                  <Button 
                    onClick={() => router.push(`/area-knowledge/${areaSlug}/${subcategorySlug}/${article.id}`)}
                    className="bg-gold hover:bg-gold/80 text-white"
                  >
                    Read More
                  </Button>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div 
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold
                            ${article.testScore < 50 ? 'bg-red-500' : 
                              article.testScore < 80 ? 'bg-orange-500' : 'bg-green-500'}`}
                        >
                          {article.testScore}%
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Your test score for this topic</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center">
        {Array.from({ length: Math.ceil(articles.length / articlesPerPage) }, (_, i) => (
          <Button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`mx-1 ${currentPage === i + 1 ? 'bg-gold text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </div>
  )
}

