import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const testimonials = [
  {
    name: "Ahmed Ali",
    feedback: "UAEzy helped me pass my RERA exam and boosted my confidence to succeed in Dubai's competitive market!",
    avatar: "/placeholder-avatar-1.jpg"
  },
  {
    name: "Sarah Khan",
    feedback: "The area knowledge section is incredibly detailed. It's like having a local expert guiding you through Dubai's real estate landscape.",
    avatar: "/placeholder-avatar-2.jpg"
  },
  {
    name: "Michael Rodriguez",
    feedback: "Daily challenges keep me engaged and ensure I'm always improving. UAEzy is a game-changer for aspiring real estate professionals!",
    avatar: "/placeholder-avatar-3.jpg"
  }
]

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8 text-gold">About UAEzy</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gold">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Empowering brokers with the knowledge and tools to succeed in Dubai's luxury real estate market. UAEzy is committed to providing comprehensive, up-to-date information and resources to help real estate professionals navigate the complexities of Dubai's property landscape.</p>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mb-4 text-gold">Our Achievements</h2>
        <Card className="mb-8">
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>2022: Launched UAEzy platform, revolutionizing online real estate education in Dubai</li>
              <li>2023: Reached 10,000+ active users, becoming the go-to resource for RERA exam preparation</li>
              <li>2024: Partnered with top 5 real estate agencies in Dubai, integrating UAEzy into their training programs</li>
              <li>2024: Achieved a 95% pass rate for RERA exams among UAEzy users</li>
            </ul>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mb-4 text-gold">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            { name: "Sarah Al-Maktoum", role: "Founder & CEO", expertise: "15+ years in Dubai real estate, former RERA advisor" },
            { name: "John Smith", role: "Head of Education", expertise: "Former RERA examiner, 20+ years in real estate education" },
            { name: "Fatima Hassan", role: "Lead Developer", expertise: "10+ years in EdTech, specializing in interactive learning platforms" },
            { name: "Ahmed Al-Mansoori", role: "Legal Advisor", expertise: "Expert in UAE property law, former judge in Dubai Land Department" },
            { name: "Lisa Chen", role: "User Experience Designer", expertise: "Award-winning UX designer with a focus on educational interfaces" },
            { name: "Mohammed Al-Hashimi", role: "Market Research Analyst", expertise: "10+ years analyzing Dubai's real estate trends and forecasts" },
          ].map((member) => (
            <Card key={member.name}>
              <CardHeader>
                <CardTitle className="text-xl text-gold">{member.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">{member.role}</p>
                <p className="text-sm text-gray-600">{member.expertise}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="text-3xl font-bold mb-8 text-center">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarImage src={testimonial.avatar} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                  </div>
                  <p className="text-gray-600">{testimonial.feedback}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

