'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PreTestPage } from '@/components/PreTestPage'
import { ProgressBar } from '@/components/ProgressBar'
import { DailyChallengeResults } from '@/components/DailyChallengeResults'
import { StreakTracker } from '@/components/StreakTracker'
import { ErrorBoundary } from "react-error-boundary"

const questions = [
  {
    question: 'What is the minimum down payment required for a mortgage in Dubai?',
    options: ['10%', '15%', '20%', '25%'],
    correctAnswer: '20%'
  },
  {
    question: 'Which area in Dubai is known as the "Center of Now"?',
    options: ['Dubai Marina', 'Downtown Dubai', 'Palm Jumeirah', 'Dubai Hills'],
    correctAnswer: 'Downtown Dubai'
  },
  {
    question: 'What does RERA stand for?',
    options: ['Real Estate Regulatory Agency', 'Royal Emirates Real Estate Association', 'Residential Estate Rental Authority', 'Real Estate Registration Authority'],
    correctAnswer: 'Real Estate Regulatory Agency'
  }
]

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert" className="text-center p-4">
      <h2 className="text-xl font-bold mb-2">Oops! Something went wrong.</h2>
      <p className="mb-4">We're having trouble loading this page. Please try again later.</p>
      <Button onClick={resetErrorBoundary} className="bg-gold hover:bg-gold/80 text-white">
        Retry
      </Button>
    </div>
  )
}

export default function DailyChallenges() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [streak, setStreak] = useState(0)
  const [showPreTest, setShowPreTest] = useState(true)
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [lastCompletionDate, setLastCompletionDate] = useState<string | null>(null);

  useEffect(() => {
    const storedStreak = localStorage.getItem('dailyStreak');
    const storedLastCompletion = localStorage.getItem('lastCompletionDate');
    if (storedStreak) setStreak(parseInt(storedStreak, 10));
    if (storedLastCompletion) setLastCompletionDate(storedLastCompletion);
  }, [])

  const handleAnswerClick = (selectedAnswer: string) => {
    const newUserAnswers = [...userAnswers, selectedAnswer]
    setUserAnswers(newUserAnswers)

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    const nextQuestion = currentQuestion + 1
    if (nextQuestion >= questions.length) {
      setShowScore(true);
      const today = new Date().toDateString();
      if (lastCompletionDate !== today) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        setLastCompletionDate(today);
        localStorage.setItem('dailyStreak', newStreak.toString());
        localStorage.setItem('lastCompletionDate', today);
      }
    } else {
      setCurrentQuestion(nextQuestion);
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowScore(false)
    setUserAnswers([])
  }

  const startQuiz = () => {
    setShowPreTest(false)
  }

  return (
    <div className="min-h-screen bg-cover bg-center py-8" style={{backgroundImage: "url('http://uaezy.com/wp-content/uploads/2024/12/dramatic-perspective-with-low-angle-view-skyscrapers-looking-up-sky-dubai-vanishing-point-scaled.jpg')"}}>
      <div className="container mx-auto px-4">
        <Card className="p-6 bg-white bg-opacity-90 max-w-2xl mx-auto">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <h1 className="text-3xl font-bold mb-6 text-gold text-center">Daily Challenge</h1>
            {!showScore && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Your Current Streak</h2>
                <StreakTracker streak={streak} />
              </div>
            )}
            {showPreTest ? (
              <PreTestPage
                topic="Dubai's real estate market"
                duration="2-5 minutes"
                onStart={startQuiz}
              />
            ) : showScore ? (
              <DailyChallengeResults
                score={score}
                totalQuestions={questions.length}
                userAnswers={userAnswers}
                questions={questions}
                onRetry={resetQuiz}
                streak={streak}
              />
            ) : (
              <CardContent className="p-0">
                <ProgressBar current={currentQuestion + 1} total={questions.length} />
                <h2 className="text-xl font-semibold my-4">Question {currentQuestion + 1}</h2>
                <p className="mb-4">{questions[currentQuestion].question}</p>
                <div className="space-y-2">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswerClick(option)}
                      className="w-full text-left justify-start bg-white text-black border border-gold hover:bg-gold hover:text-white transition-colors duration-300"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </CardContent>
            )}
          </ErrorBoundary>
        </Card>
      </div>
    </div>
  )
}

