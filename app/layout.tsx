'use client'

import './globals.css'
import Header from './components/Header'
import Footer from '@/components/Footer'
import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ErrorBoundary } from 'react-error-boundary'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { useAuth } from '@/hooks/useAuth'

function ErrorFallback({error}) {
  return (
    <div role="alert" className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Something went wrong:</h1>
      <pre className="text-red-500">{error.message}</pre>
    </div>
  )
}

const publicPages = ['/', '/about', '/privacy-policy', '/terms-and-conditions', '/contact']

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoggedIn, logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Load font dynamically
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }, [])

  useEffect(() => {
    if (!isLoggedIn && pathname) {
      const isPublicPage = publicPages.some(page => 
        pathname === page || 
        (pathname.startsWith(page) && page !== '/')
      )
      if (!isPublicPage) {
        router.push('/')
      }
    }
  }, [isLoggedIn, pathname, router])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  useScrollToTop()

  return (
    <html lang="en">
      <body className="bg-white text-black flex flex-col min-h-screen font-sans">
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <main className="flex-grow">
            {children}
          </main>
        </ErrorBoundary>
        <Footer />
      </body>
    </html>
  )
}

