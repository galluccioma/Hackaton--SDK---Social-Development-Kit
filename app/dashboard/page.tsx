"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { StarterKitCard } from "@/components/starter-kit-card"
import { PendingProjectCard } from "@/components/pending-project-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  currentUser,
  starterKits,
  pendingProjects,
  activityTypes,
} from "@/lib/data"
import {
  Settings,
  Plus,
  Sparkles,
  FolderOpen,
  UserCheck,
  X,
} from "lucide-react"

export default function DashboardPage() {
  const [interests, setInterests] = useState<string[]>(currentUser.interests)
  const [editingInterests, setEditingInterests] = useState(false)

  // Suggested activities based on interests
  const suggestedKits = starterKits.filter((kit) =>
    interests.includes(kit.category)
  )
  const suggestedProjects = pendingProjects.filter(
    (project) =>
      interests.includes(project.category) ||
      project.neighborhood === currentUser.neighborhood
  )

  // User&apos;s joined projects (mock - in reality would come from API)
  const joinedProjects = pendingProjects.filter((p) =>
    p.collaborators.some((c) => c.name.includes("Marco"))
  )

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest))
    } else {
      setInterests([...interests, interest])
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar - Profile */}
          <div className="space-y-6 lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="mb-4 h-20 w-20">
                    <AvatarImage
                      src={currentUser.avatar}
                      alt={currentUser.name}
                    />
                    <AvatarFallback className="text-xl">
                      {currentUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold">{currentUser.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {currentUser.neighborhood}, Torino
                  </p>
                  <Button variant="outline" size="sm" className="mt-4 gap-2">
                    <Settings className="h-4 w-4" />
                    Modifica profilo
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Interests */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base">I miei interessi</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingInterests(!editingInterests)}
                >
                  {editingInterests ? "Fatto" : "Modifica"}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {editingInterests ? (
                    activityTypes.map((type) => (
                      <Badge
                        key={type}
                        variant={interests.includes(type) ? "default" : "outline"}
                        className="cursor-pointer transition-colors"
                        onClick={() => toggleInterest(type)}
                      >
                        {interests.includes(type) && (
                          <X className="mr-1 h-3 w-3" />
                        )}
                        {type}
                      </Badge>
                    ))
                  ) : (
                    interests.map((interest) => (
                      <Badge key={interest} variant="secondary">
                        {interest}
                      </Badge>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Le mie statistiche</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Progetti partecipati
                  </span>
                  <span className="font-semibold">{joinedProjects.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Kit scaricati
                  </span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Progetti creati
                  </span>
                  <span className="font-semibold">1</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="space-y-8 lg:col-span-3">
            {/* Welcome Section */}
            <div className="flex flex-col gap-4 rounded-lg border bg-muted/30 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-xl font-bold">
                  Ciao, {currentUser.name.split(" ")[0]}!
                </h1>
                <p className="text-sm text-muted-foreground">
                  Scopri nuove attività nel tuo quartiere
                </p>
              </div>
              <Button size="sm" className="gap-2" asChild>
                <Link href="/">
                  <Plus className="h-4 w-4" />
                  Nuova attività
                </Link>
              </Button>
            </div>

            {/* Suggested Activities */}
            <section>
              <div className="mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Suggeriti per te</h2>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                In base ai tuoi interessi e al quartiere {currentUser.neighborhood}
              </p>

              {suggestedProjects.length > 0 || suggestedKits.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {suggestedProjects.slice(0, 2).map((project) => (
                    <PendingProjectCard key={project.id} project={project} />
                  ))}
                  {suggestedKits.slice(0, 1).map((kit) => (
                    <StarterKitCard key={kit.id} kit={kit} />
                  ))}
                </div>
              ) : (
                <Card className="py-8 text-center">
                  <CardContent>
                    <p className="text-muted-foreground">
                      Aggiungi interessi per vedere suggerimenti personalizzati
                    </p>
                  </CardContent>
                </Card>
              )}
            </section>

            {/* My Activities */}
            <section>
              <div className="mb-4 flex items-center gap-2">
                <FolderOpen className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Le mie attività</h2>
              </div>

              <Tabs defaultValue="joined">
                <TabsList className="mb-4">
                  <TabsTrigger value="joined" className="gap-2">
                    <UserCheck className="h-4 w-4" />
                    Partecipo
                  </TabsTrigger>
                  <TabsTrigger value="created" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Creati da me
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="joined">
                  {joinedProjects.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                      {joinedProjects.map((project) => (
                        <PendingProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                  ) : (
                    <Card className="py-12 text-center">
                      <CardContent>
                        <UserCheck className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
                        <h3 className="mb-2 font-semibold">
                          Non partecipi ancora a nessun progetto
                        </h3>
                        <p className="mb-4 text-sm text-muted-foreground">
                          Esplora i progetti attivi e unisciti a quelli che ti
                          interessano
                        </p>
                        <Button asChild>
                          <Link href="/#projects">Esplora progetti</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="created">
                  <Card className="py-12 text-center">
                    <CardContent>
                      <Plus className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
                      <h3 className="mb-2 font-semibold">
                        Non hai ancora creato progetti
                      </h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        Parti da uno starter kit per creare la tua prima attività
                      </p>
                      <Button asChild>
                        <Link href="/">Esplora starter kit</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </section>
          </div>
        </div>
      </main>

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
