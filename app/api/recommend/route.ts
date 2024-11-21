import { NextResponse } from 'next/server'
import { Configuration, OpenAIApi } from 'openai'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export async function POST(request: Request) {
  const body = await request.json()
  const { category, userId } = body

  let userPreferences = ''
  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { searches: true, reviews: true }
    })
    if (user) {
      userPreferences = `User's previous searches: ${user.searches.map(s => s.term).join(', ')}. `
      userPreferences += `User's reviews: ${user.reviews.map(r => `${r.productName}: ${r.rating}`).join(', ')}.`
    }
  }

  const prompt = `Given the category "${category}" and the following user preferences: ${userPreferences}, recommend top 3 products:`

  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: prompt,
    max_tokens: 150,
  })

  // Save the search term for the user
  if (userId) {
    await prisma.search.create({
      data: {
        userId: userId,
        term: category
      }
    })
  }

  return NextResponse.json({ recommendations: completion.data.choices[0].text })
}

