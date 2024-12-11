import { Logo } from '@/components/Logo'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Logo variant="footer" size="medium" href={null} />
            <p className="mt-2 text-sm">UAEzy – Master Dubai Real Estate</p>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end space-x-4 mb-4 md:mb-0">
            <Link href="/about" className="hover:text-gold transition-colors duration-300">About</Link>
            <Link href="/contact" className="hover:text-gold transition-colors duration-300">Contact</Link>
            <Link href="/privacy-policy" className="hover:text-gold transition-colors duration-300">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-gold transition-colors duration-300">Terms & Conditions</Link>
          </nav>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gold transition-colors duration-300">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-white hover:text-gold transition-colors duration-300">
              <Twitter size={24} />
            </a>
            <a href="https://www.instagram.com/uae.zy/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold transition-colors duration-300">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-white hover:text-gold transition-colors duration-300">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          © {new Date().getFullYear()} UAEzy. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

