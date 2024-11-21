import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TopTen - Discover the Best Products and Services',
  description: 'Compare and find the top 10 best products and services across various categories. AI-powered recommendations to help you make informed decisions.',
  keywords: 'top 10, product comparison, service reviews, AI recommendations',
  openGraph: {
    title: 'TopTen - Discover the Best Products and Services',
    description: 'Compare and find the top 10 best products and services across various categories.',
    url: 'https://topten.example.com',
    siteName: 'TopTen',
    images: [
      {
        url: 'https://topten.example.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

