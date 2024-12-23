'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import ReCAPTCHA from "react-google-recaptcha"
import { Card, CardContent } from '@/components/ui/card'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [captchaValue, setCaptchaValue] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!captchaValue) {
      toast({
        title: "Error",
        description: "Please complete the reCAPTCHA.",
        variant: "destructive",
      })
      return
    }
    // In a real app, you'd send this data to your backend
    console.log({ name, email, message, captchaValue })
    toast({
      title: "Message Sent",
      description: "We'll get back to you as soon as possible.",
    })
    setName('')
    setEmail('')
    setMessage('')
    setCaptchaValue(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gold">Contact Us</h1>
      <Card className="max-w-2xl mx-auto">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full h-32"
              />
            </div>
            <div>
              {/* Placeholder for reCAPTCHA */}
              <div className="bg-gray-100 p-4 text-center">reCAPTCHA placeholder</div>
            </div>
            <Button type="submit" className="w-full bg-gold hover:bg-gold/80 text-white">
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

