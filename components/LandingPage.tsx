'use client'

import { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useTranslation } from 'next-i18next'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FeatureCard } from "./FeatureCard"
import { CategoryButton } from "./CategoryButton"
import { ProductList } from "./ProductList"
import { Search, Zap, Award, TrendingUp, Compass, BarChart3, Layers, ArrowRight, Moon, Sun } from 'lucide-react'
import axios from 'axios'
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function LandingPage() {
  const { t } = useTranslation('common')
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const [searchTerm, setSearchTerm] = useState('')
  const [recommendations, setRecommendations] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    if (!searchTerm.trim()) return

    setIsLoading(true)
    try {
      const response = await axios.post('/api/recommend', { 
        category: searchTerm,
        userId: session?.user?.id
      })
      setRecommendations(response.data.recommendations)
    } catch (error) {
      console.error('Error fetching recommendations:', error)
      setRecommendations('Sorry, we couldn\'t fetch recommendations at this time. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-violet-600 to-indigo-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <header className="p-6 flex justify-between items-center backdrop-blur-md bg-white/10 dark:bg-black/10 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-white">TopTen</h1>
        <nav className="flex items-center space-x-4">
          <Button variant="link" className="text-white">{t('about')}</Button>
          <Button variant="link" className="text-white">{t('categories')}</Button>
          <Button variant="link" className="text-white">{t('contact')}</Button>
          {session ? (
            <Button onClick={() => signOut()} variant="outline" className="text-white border-white">{t('signOut')}</Button>
          ) : (
            <Button onClick={() => signIn()} variant="outline" className="text-white border-white">{t('signIn')}</Button>
          )}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <motion.section 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-white/80 mb-8">
            {t('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Input 
              placeholder="Search for top products..." 
              className="max-w-md bg-white/10 backdrop-blur-sm border-none text-white placeholder-white/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button 
              className="bg-white text-purple-700 hover:bg-purple-100 dark:bg-purple-700 dark:text-white dark:hover:bg-purple-600" 
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : (
                <>
                  <Search className="mr-2 h-4 w-4" /> {t('search')}
                </>
              )}
            </Button>
          </div>
          {recommendations && (
            <motion.div 
              className="mt-8 p-4 bg-white/10 backdrop-blur-sm rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold text-white mb-2">AI Recommendations:</h3>
              <p className="text-white/80">{recommendations}</p>
            </motion.div>
          )}
        </motion.section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <FeatureCard 
            icon={Zap} 
            title="Fast Comparisons" 
            description="Quickly compare top options side-by-side."
          />
          <FeatureCard 
            icon={Award} 
            title="Expert Reviews" 
            description="In-depth analysis from industry experts."
          />
          <FeatureCard 
            icon={TrendingUp} 
            title="Trending Products" 
            description="Stay updated with the latest and greatest."
          />
        </section>

        <section className="text-center mb-16">
          <h3 className="text-2xl font-semibold text-white mb-6">Popular Categories</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <CategoryButton icon={Compass} label="Travel" />
            <CategoryButton icon={BarChart3} label="Finance" />
            <CategoryButton icon={Layers} label="Software" />
          </div>
        </section>

        <ProductList />

        <motion.section 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-white mb-6">Ready to find your perfect match?</h3>
          <Button className="bg-white text-purple-700 hover:bg-purple-100 dark:bg-purple-700 dark:text-white dark:hover:bg-purple-600">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.section>
      </main>

      <footer className="bg-white/10 backdrop-blur-sm text-white text-center p-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-semibold mb-2">About TopTen</h4>
            <p className="text-sm">We help you find the best products and services through AI-powered recommendations and expert reviews.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="text-sm">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">Categories</a></li>
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Follow Us</h4>
            <div className="flex justify-center space-x-4">
              <a href="#" className="hover:text-purple-300">Facebook</a>
              <a href="#" className="hover:text-purple-300">Twitter</a>
              <a href="#" className="hover:text-purple-300">Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <p>&copy; 2024 TopTen. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

