'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, ArrowRight } from 'lucide-react'
import { motion } from "framer-motion"

interface Product {
  id: string
  name: string
  description: string
  category: string
  rating: number
}

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products')
        if (Array.isArray(response.data)) {
          setProducts(response.data)
        } else {
          setError('Received invalid data from the server.')
        }
      } catch (error) {
        console.error('Error fetching products:', error)
        setError('Failed to fetch products. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (isLoading) {
    return <div className="text-white text-center">Loading products...</div>
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>
  }

  return (
    <section className="mb-16">
      <h3 className="text-2xl font-semibold text-white mb-6 text-center">Top Products</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-none hover:bg-white/20 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-white flex justify-between items-center">
                    {product.name}
                    <span className="text-sm flex items-center">
                      {product.rating} <Star className="ml-1 h-4 w-4 fill-yellow-400" />
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 mb-2">{product.description}</p>
                  <p className="text-white/80 mb-4">Category: {product.category}</p>
                  <a href="#" className="text-purple-300 hover:text-purple-100 flex items-center">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <p className="text-white text-center col-span-3">No products available at the moment.</p>
        )}
      </div>
    </section>
  )
}

