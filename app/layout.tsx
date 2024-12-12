'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from '@/components/Footer'
import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Toaster } from '@/components/ui/toaster'
import { ErrorBoundary } from 'react-error-boundary'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { useAuth } from '@/hooks/useAuth'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={`${inter.className} bg-white text-black flex flex-col min-h-screen`}>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <main className="flex-grow">
            {children}
          </main>
        </ErrorBoundary>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}

