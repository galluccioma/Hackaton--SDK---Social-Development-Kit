import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { starterKits, type Difficulty } from "@/lib/data"
import { KitMapSection } from "@/components/kit-map-section"

import {
  ArrowLeft,
  Download,
  Users,
  Clock,
  CheckCircle2,
  Rocket,
  UserPlus,
} from "lucide-react"

const difficultyConfig: Record<Difficulty, { label: string; className: string }> = {
  easy: { label: "Facile", className: "bg-green-100 text-green-800 border-green-200" },
  medium: { label: "Medio", className: "bg-amber-100 text-amber-800 border-amber-200" },
  hard: { label: "Difficile", className: "bg-red-100 text-red-800 border-red-200" },
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function StarterKitDetailPage({ params }: PageProps) {
  const { id } = await params
  const kit = starterKits.find((k) => k.id === id)

  if (!kit) {
    notFound()
  }

  const difficulty = difficultyConfig[kit.difficulty]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[300px] w-full md:h-[400px]">
          <Image
            src={kit.image}
            alt={kit.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4">
          <div className="relative -mt-32 pb-8">
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Torna alla home
            </Link>

            <div className="rounded-xl border bg-card p-6 shadow-lg md:p-8">
              <div className="flex flex-wrap items-start gap-2">
                <Badge variant="secondary">{kit.category}</Badge>
                <Badge variant="outline" className={difficulty.className}>
                  {difficulty.label}
                </Badge>
              </div>

              <h1 className="mb-4 mt-4 text-3xl font-bold md:text-4xl text-balance">{kit.title}</h1>
              <p className="mb-6 text-lg text-muted-foreground">{kit.description}</p>

              <div className="mb-6 flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Partecipanti</p>
                    <p className="font-semibold">{kit.estimatedParticipants}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Durata</p>
                    <p className="font-semibold">{kit.duration}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="gap-2">
                  <Rocket className="h-4 w-4" />
                  Avvia questo progetto
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <UserPlus className="h-4 w-4" />
                  Trova collaboratori
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Guida passo-passo</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {kit.steps.map((step, index) => (
                    <li key={index} className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                        {index + 1}
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-foreground">{step}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* Mappa aggiunta qui, isolata come Client Component */}
            <KitMapSection />
          </div>

          <div className="space-y-6">
            {/* Download Toolkit */}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Download className="h-5 w-5" />
                  Scarica il toolkit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  Il toolkit include template, checklist e materiali pronti all&apos;uso per
                  organizzare la tua attività.
                </p>
                <Button className="w-full gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>

            {/* What&apos;s Included */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cosa include</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>Guida completa all&apos;organizzazione</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>Template per comunicazioni</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>Checklist dei materiali</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>Consigli per la promozione</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>Moduli di iscrizione</span>
                  </li>
                </ul>
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