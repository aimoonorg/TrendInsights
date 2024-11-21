import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TypeIcon as type, LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-none">
      <CardHeader>
        <Icon className="h-8 w-8 text-purple-300" />
        <CardTitle className="text-xl font-semibold text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-white/80">{description}</p>
      </CardContent>
    </Card>
  )
}

