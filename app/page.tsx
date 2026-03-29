"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { StarterKitCard } from "@/components/starter-kit-card"
import { PendingProjectCard } from "@/components/pending-project-card"
import { Filters, type FilterValues } from "@/components/filters"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { starterKits, pendingProjects } from "@/lib/data"
import { useNeighborhood } from "@/lib/neighborhood-context"
import { ArrowRight, Users, Sparkles, MapPin } from "lucide-react"
import Link from "next/link"

const defaultFilters: FilterValues = {
  activityType: "all",
  difficulty: "all",
  participants: [0, 100],
  collaborators: [0, 10],
}

export default function HomePage() {
  const [filters, setFilters] = useState<FilterValues>(defaultFilters)
  const [activeTab, setActiveTab] = useState("all")
  const { selectedNeighborhood, neighborhoodName } = useNeighborhood()

  const filteredStarterKits = useMemo(() => {
    return starterKits.filter((kit) => {
      if (filters.activityType !== "all" && kit.category !== filters.activityType) return false
      if (filters.difficulty !== "all" && kit.difficulty !== filters.difficulty) return false
      return true
    })
  }, [filters])

  const filteredProjects = useMemo(() => {
    return pendingProjects.filter((project) => {
      if (filters.activityType !== "all" && project.category !== filters.activityType) return false
      if (selectedNeighborhood !== "all" && project.neighborhood !== selectedNeighborhood) return false
      if (project.requiredCollaborators < filters.collaborators[0] || project.requiredCollaborators > filters.collaborators[1]) return false
      return true
    })
  }, [filters, selectedNeighborhood])

  const resetFilters = () => setFilters(defaultFilters)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm shadow-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-medium">SDK</span>
              <span className="text-muted-foreground">=</span>
              <span className="text-muted-foreground">Social Development Kit</span>
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance">
              Costruisci comunità nel tuo{" "}
              <span className="text-primary">quartiere</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl text-pretty">
              Scarica uno starter kit, trova collaboratori e lancia attività che uniscono le persone. 
              Tutto parte da un&apos;idea condivisa.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="gap-2 px-8" asChild>
                <Link href="#explore">
                  Esplora attività
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#projects">Come funziona</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="border-t bg-muted/30">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="flex items-center justify-center gap-2 text-2xl font-bold text-primary md:text-3xl">
                  <Users className="h-6 w-6" />
                  {pendingProjects.reduce((acc, p) => acc + p.collaborators.length, 0)}+
                </div>
                <p className="text-sm text-muted-foreground">Partecipanti attivi</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary md:text-3xl">
                  {pendingProjects.length}
                </div>
                <p className="text-sm text-muted-foreground">Progetti in corso</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary md:text-3xl">
                  {starterKits.length}
                </div>
                <p className="text-sm text-muted-foreground">Starter kit</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Neighborhood Indicator */}
      {selectedNeighborhood !== "all" && (
        <div className="border-b bg-primary/5">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-primary" />
              <span>
                Stai esplorando: <strong>{neighborhoodName}</strong>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Filters & Content */}
      <section id="explore" className="container mx-auto px-4 py-8">
        <Filters filters={filters} onFilterChange={setFilters} onReset={resetFilters} />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            <TabsList>
              <TabsTrigger value="all">Tutti</TabsTrigger>
              <TabsTrigger value="projects">Progetti</TabsTrigger>
              <TabsTrigger value="kits">Starter Kit</TabsTrigger>
            </TabsList>
            <p className="text-sm text-muted-foreground">
              {filteredProjects.length + filteredStarterKits.length} risultati
              {selectedNeighborhood !== "all" && ` in ${neighborhoodName}`}
            </p>
          </div>

          <TabsContent value="all" className="mt-0">
            {/* Projects Section */}
            {filteredProjects.length > 0 && (
              <div id="projects" className="mb-12">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Progetti in cerca di collaboratori</h2>
                  <Link href="#" className="text-sm font-medium text-primary hover:underline">
                    Vedi tutti
                  </Link>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredProjects.map((project) => (
                    <PendingProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            )}

            {/* Starter Kits Section */}
            {filteredStarterKits.length > 0 && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Starter Kit disponibili</h2>
                  <Link href="#" className="text-sm font-medium text-primary hover:underline">
                    Vedi tutti
                  </Link>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredStarterKits.map((kit) => (
                    <StarterKitCard key={kit.id} kit={kit} />
                  ))}
                </div>
              </div>
            )}

            {filteredProjects.length === 0 && filteredStarterKits.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-muted-foreground">
                  Nessun risultato trovato con i filtri selezionati
                </p>
                <Button variant="outline" className="mt-4" onClick={resetFilters}>
                  Rimuovi filtri
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="kits" className="mt-0">
            {filteredStarterKits.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredStarterKits.map((kit) => (
                  <StarterKitCard key={kit.id} kit={kit} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <p className="text-muted-foreground">
                  Nessuno starter kit trovato
                </p>
                <Button variant="outline" className="mt-4" onClick={resetFilters}>
                  Rimuovi filtri
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="projects" className="mt-0">
            {filteredProjects.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                  <PendingProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <p className="text-muted-foreground">
                  Nessun progetto trovato
                  {selectedNeighborhood !== "all" && ` in ${neighborhoodName}`}
                </p>
                <Button variant="outline" className="mt-4" onClick={resetFilters}>
                  Rimuovi filtri
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
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
