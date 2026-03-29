"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MapPin, Users, ArrowRight, Heart } from "lucide-react"
import type { PendingProject } from "@/lib/data"
import { useState } from "react"

interface PendingProjectCardProps {
  project: PendingProject
}

export function PendingProjectCard({ project }: PendingProjectCardProps) {
  const [liked, setLiked] = useState(false)
  const progressPercent = (project.currentCollaborators / project.requiredCollaborators) * 100
  const missingCollaborators = project.requiredCollaborators - project.currentCollaborators

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-primary text-primary-foreground">
            {project.status === "in-partenza" ? "In partenza" : "In corso"}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
            {project.category}
          </Badge>
        </div>

        {/* Like button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            setLiked(!liked)
          }}
          className="absolute bottom-3 right-3 rounded-full bg-background/90 p-2 backdrop-blur-sm transition-colors hover:bg-background"
          aria-label={liked ? "Rimuovi like" : "Aggiungi like"}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              liked ? "fill-red-500 text-red-500" : "text-muted-foreground"
            }`}
          />
        </button>
      </div>

      <CardHeader className="pb-2">
        <Link href={`/projects/${project.id}`}>
          <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {project.title}
          </h3>
        </Link>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          <span>{project.neighborhood}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Collaboratori</span>
            <span className="font-medium">
              {project.currentCollaborators}/{project.requiredCollaborators}
            </span>
          </div>
          <Progress value={progressPercent} className="h-2" />
          {missingCollaborators > 0 && (
            <p className="text-xs text-muted-foreground">
              {missingCollaborators === 1 ? "Ne manca 1" : `Ne mancano ${missingCollaborators}`} per iniziare
            </p>
          )}
        </div>

        {/* Collaborators */}
        {project.collaborators.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {project.collaborators.slice(0, 4).map((collab) => (
                <Avatar key={collab.id} className="h-7 w-7 border-2 border-background">
                  <AvatarImage src={collab.avatar} alt={collab.name} />
                  <AvatarFallback className="text-xs">
                    {collab.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
              ))}
              {project.collaborators.length > 4 && (
                <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                  +{project.collaborators.length - 4}
                </div>
              )}
            </div>
            <span className="text-xs text-muted-foreground">
              {project.collaborators.length === 1
                ? "1 persona partecipa"
                : `${project.collaborators.length} persone partecipano`}
            </span>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <Button variant="outline" className="w-full gap-2" asChild>
          <Link href={`/projects/${project.id}`}>
            Scopri di più
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
