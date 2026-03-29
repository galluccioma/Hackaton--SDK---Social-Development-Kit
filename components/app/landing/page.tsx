"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { StarterKitCard } from "@/components/starter-kit-card"
import { PendingProjectCard } from "@/components/pending-project-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { starterKits, pendingProjects } from "@/lib/data_landing"
import { useNeighborhood, neighborhoods } from "@/lib/neighborhood-context"
import {
  ArrowRight,
  Users,
  Sparkles,
  MapPin,
  Rocket,
  Download,
  Lightbulb,
} from "lucide-react"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("kits")
  const { selectedNeighborhood, setSelectedNeighborhood, neighborhoodName } = useNeighborhood()

  // Filtriamo i kit (primi 3) e i progetti (in base al quartiere)
  const displayKits = starterKits.slice(0, 3)
  const displayProjects = pendingProjects.filter((p) => 
    selectedNeighborhood === "all" || p.neighborhood === selectedNeighborhood
  )

  const steps = [
    {
      number: "01",
      icon: Lightbulb,
      title: "Scegli un'attività",
      description: "Esplora i nostri starter kit: tornei, swap party e molto altro. Ogni kit include tutto il necessario.",
    },
    {
      number: "02",
      icon: Download,
      title: "Scarica lo starter kit",
      description: "Contiene guide passo-passo, checklist e template pronti all'uso per la tua attività.",
    },
    {
      number: "03",
      icon: Users,
      title: "Trova collaboratori",
      description: "Pubblica il tuo progetto e trova altri giovani del quartiere interessati a collaborare.",
    },
    {
      number: "04",
      icon: MapPin,
      title: "Scegli il luogo",
      description: "Scopri parchi, centri civici o cortili. Ti aiutiamo a trovare il posto perfetto.",
    },
    {
      number: "05",
      icon: Rocket,
      title: "Lancia l'attività",
      description: "Quando hai il team e il luogo, sei pronto! Organizza il tuo primo evento di comunità.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm shadow-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-medium">KIT&GO</span>
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

            {/* Neighborhood Selector CTA */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <div className="flex items-center gap-2 rounded-lg border bg-background p-1 shadow-sm">
                <Select value={selectedNeighborhood} onValueChange={setSelectedNeighborhood}>
                  <SelectTrigger className="w-[200px] border-0 focus:ring-0">
                    <MapPin className="mr-2 h-4 w-4 text-primary" />
                    <SelectValue placeholder="Scegli quartiere" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutti i quartieri</SelectItem>
                    {neighborhoods.map((n) => (
                      <SelectItem key={n} value={n}>{n}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explorer Section */}
      <section id="explore" className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl text-balance">
            Scegli il tuo 
              <span className="text-primary"> starter kit</span>
            </h2>
          <TabsContent value="kits" className="mt-0">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayKits.map((kit) => (
                <StarterKitCard key={kit.id} kit={kit} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="mt-0">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayProjects.length > 0 ? (
                displayProjects.map((project) => (
                  <PendingProjectCard key={project.id} project={project} />
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-muted-foreground border rounded-xl border-dashed">
                  Nessun progetto attivo in questo quartiere. Sii il primo a lanciarne uno!
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="all" className="mt-0 space-y-12">
             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {displayProjects.map((p) => <PendingProjectCard key={p.id} project={p} />)}
                {displayKits.map((k) => <StarterKitCard key={k.id} kit={k} />)}
             </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* How it Works Section */}
      <section className="border-y bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl text-balance">Come funziona in 5 passi</h2>
            <p className="mt-4 text-muted-foreground text-pretty">
              Dall&apos;ispirazione all&apos;azione, ti accompagniamo in ogni fase della creazione del tuo progetto.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl relative">
            <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-border md:left-1/2 md:-ml-px md:block" />
            <div className="space-y-8 md:space-y-12">
              {steps.map((step, index) => (
                <div key={step.number} className={`relative flex flex-col gap-4 md:flex-row md:gap-8 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                  <div className="flex-1">
                    <div className={`rounded-xl border bg-card p-6 shadow-sm ${index % 2 === 1 ? "md:text-left" : "md:text-right"}`}>
                      <div className={`mb-3 flex items-center gap-3 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <step.icon className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-bold text-primary italic">{step.number}</span>
                      </div>
                      <h3 className="text-lg font-bold">{step.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 top-10 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-background bg-primary md:block" />
                  <div className="hidden flex-1 md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground text-xl">S</div>
              <div className="flex flex-col">
                <span className="font-bold leading-none tracking-tight">KIT&GO</span>
                <span className="text-xs text-muted-foreground">Social Development Kit</span>
              </div>
            </div>
            <div className="flex items-center gap-8 text-sm font-medium text-muted-foreground">
              <Link href="" className="hover:text-primary transition-colors">Chi siamo</Link>
              <Link href="" className="hover:text-primary transition-colors">Contatti</Link>
              <Link href="" className="hover:text-primary transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}