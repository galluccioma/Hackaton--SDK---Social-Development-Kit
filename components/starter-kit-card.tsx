"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, Download, ArrowRight } from "lucide-react"
import type { StarterKit, Difficulty } from "@/lib/data"

const difficultyConfig: Record<Difficulty, { label: string; className: string }> = {
  easy: { label: "Facile", className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" },
  medium: { label: "Medio", className: "bg-amber-100 text-amber-700 hover:bg-amber-100" },
  hard: { label: "Difficile", className: "bg-red-100 text-red-700 hover:bg-red-100" },
}

interface StarterKitCardProps {
  kit: StarterKit
}

export function StarterKitCard({ kit }: StarterKitCardProps) {
  const difficulty = difficultyConfig[kit.difficulty]

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={kit.image}
          alt={kit.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3">
          <Badge className={difficulty.className}>
            {difficulty.label}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
            {kit.category}
          </Badge>
        </div>

        {/* Starter Kit indicator */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-accent/90 px-2.5 py-1 text-xs font-medium text-accent-foreground backdrop-blur-sm">
          <Download className="h-3 w-3" />
          Starter Kit
        </div>
      </div>

      <CardHeader className="pb-2">
        <Link href={`/starter-kit/${kit.id}`}>
          <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {kit.title}
          </h3>
        </Link>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {kit.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            <span>{kit.estimatedParticipants} persone</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{kit.duration}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="gap-2">
        <Button variant="outline" size="sm" className="gap-1.5 flex-1">
          <Download className="h-4 w-4" />
          Scarica
        </Button>
        <Button size="sm" className="gap-1.5 flex-1" asChild>
          <Link href={`/starter-kit/${kit.id}`}>
            Esplora
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
