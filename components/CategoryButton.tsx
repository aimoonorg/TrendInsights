import { Button } from "@/components/ui/button"
import { type LucideIcon } from 'lucide-react'

interface CategoryButtonProps {
  icon: LucideIcon
  label: string
}

export function CategoryButton({ icon: Icon, label }: CategoryButtonProps) {
  return (
    <Button variant="outline" className="bg-white/10 backdrop-blur-sm border-none text-white hover:bg-white/20">
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )
}

