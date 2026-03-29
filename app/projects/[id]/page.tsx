"use client"

import { notFound, useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Header } from "@/components/header"
import { LocationMap } from "@/components/location-map"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { pendingProjects, locations } from "@/lib/data"
import {
  ArrowLeft,
  MapPin,
  Heart,
  Share2,
  UserPlus,
  Calendar,
  Clock,
} from "lucide-react"

export default function ProjectDetailPage() {
  const params = useParams()
  const id = params.id as string
  const project = pendingProjects.find((p) => p.id === id)

  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(project?.likes || 0)

  if (!project) {
    notFound()
  }

  const progressPercent =
    (project.currentCollaborators / project.requiredCollaborators) * 100
  const missingCollaborators =
    project.requiredCollaborators - project.currentCollaborators

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[250px] w-full md:h-[350px]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4">
          <div className="relative -mt-24 pb-8">
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Torna alla home
            </Link>

            <div className="rounded-xl border bg-card p-6 shadow-lg md:p-8">
              <div className="flex flex-wrap items-start gap-2">
                <Badge variant="secondary">{project.category}</Badge>
                <Badge
                  className={
                    project.status === "in-partenza"
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-accent-foreground"
                  }
                >
                  {project.status === "in-partenza" ? "In partenza" : "In corso"}
                </Badge>
              </div>

              <h1 className="mb-2 mt-4 text-3xl font-bold md:text-4xl text-balance">
                {project.title}
              </h1>

              <div className="mb-6 flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{project.neighborhood}, Torino</span>
              </div>

              {/* Progress Section */}
              <div className="mb-6 rounded-lg bg-muted/50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-semibold">
                    {project.currentCollaborators}/{project.requiredCollaborators}{" "}
                    collaboratori trovati
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(progressPercent)}%
                  </span>
                </div>
                <Progress value={progressPercent} className="mb-3 h-3" />
                {missingCollaborators > 0 ? (
                  <p className="text-sm text-muted-foreground">
                    {missingCollaborators === 1
                      ? "Manca ancora 1 collaboratore per partire"
                      : `Mancano ancora ${missingCollaborators} collaboratori per partire`}
                  </p>
                ) : (
                  <p className="text-sm text-primary font-medium">
                    Il team è completo! Il progetto sta per partire.
                  </p>
                )}

                {/* Collaborator Avatars */}
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <div className="flex -space-x-2">
                    {project.collaborators.map((collaborator) => (
                      <Avatar
                        key={collaborator.id}
                        className="h-9 w-9 border-2 border-background"
                      >
                        <AvatarImage
                          src={collaborator.avatar}
                          alt={collaborator.name}
                        />
                        <AvatarFallback className="text-xs">
                          {collaborator.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {project.collaborators.map((c) => c.name).join(", ")}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="gap-2">
                  <UserPlus className="h-4 w-4" />
                  Collabora
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Invita amici
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleLike}
                  className={`gap-2 ${liked ? "text-red-500 hover:text-red-600" : ""}`}
                >
                  <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
                  {likeCount}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Descrizione del progetto</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{project.description}</p>
              </CardContent>
            </Card>

            {/* Planned Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Attività pianificata</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{project.plannedActivity}</p>
              </CardContent>
            </Card>

            {/* Map Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <MapPin className="h-5 w-5" />
                  Seleziona una location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LocationMap
                  locations={locations}
                  selectedLocation={selectedLocation}
                  onSelectLocation={setSelectedLocation}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Info rapide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Stato</p>
                    <p className="font-semibold">
                      {project.status === "in-partenza"
                        ? "In attesa di collaboratori"
                        : "Attivo"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Quartiere</p>
                    <p className="font-semibold">{project.neighborhood}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Join CTA */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <h3 className="mb-2 text-lg font-semibold">Vuoi partecipare?</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Unisciti al team e aiuta a far partire questo progetto nel
                  quartiere {project.neighborhood}.
                </p>
                <Button className="w-full">Diventa collaboratore</Button>
              </CardContent>
            </Card>

            {/* Share */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-2 text-lg font-semibold">Condividi</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Aiutaci a trovare collaboratori condividendo questo progetto.
                </p>
                <Button variant="outline" className="w-full gap-2">
                  <Share2 className="h-4 w-4" />
                  Condividi progetto
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground">
                S
              </div>
              <div className="flex flex-col">
                <span className="font-semibold leading-none">SDK</span>
                <span className="text-xs text-muted-foreground">Social Development Kit</span>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">Chi siamo</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Contatti</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
