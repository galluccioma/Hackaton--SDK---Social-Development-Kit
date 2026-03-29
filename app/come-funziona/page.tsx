import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  Users,
  MapPin,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  HandHeart,
  PartyPopper,
} from "lucide-react"

export default function ComeFunzionaPage() {
  const steps = [
    {
      number: "01",
      icon: Lightbulb,
      title: "Scegli un'attività",
      description:
        "Esplora i nostri starter kit: tornei sportivi, cineforum, swap party, gruppi di lettura e molto altro. Ogni kit include tutto ciò che serve per organizzare l'attività.",
    },
    {
      number: "02",
      icon: Download,
      title: "Scarica lo starter kit",
      description:
        "Ogni starter kit contiene guide passo-passo, checklist, template e suggerimenti pratici. È come avere un manuale completo per organizzare la tua attività.",
    },
    {
      number: "03",
      icon: Users,
      title: "Trova collaboratori",
      description:
        "Non devi fare tutto da solo. Pubblica il tuo progetto e trova altri giovani del quartiere interessati a collaborare. Insieme è più facile e divertente.",
    },
    {
      number: "04",
      icon: MapPin,
      title: "Scegli il luogo",
      description:
        "Scopri gli spazi disponibili nel tuo quartiere: parchi, centri civici, cortili condominiali. Ti aiutiamo a trovare il posto perfetto per la tua attività.",
    },
    {
      number: "05",
      icon: Rocket,
      title: "Lancia l'attività",
      description:
        "Quando hai il team e il luogo, sei pronto a partire! Organizza il tuo primo evento e inizia a creare comunità nel tuo quartiere.",
    },
  ]

  const benefits = [
    {
      icon: HandHeart,
      title: "Impatto locale",
      description: "Crea connessioni reali nel tuo quartiere e contribuisci a costruire una comunità più viva.",
    },
    {
      icon: CheckCircle2,
      title: "Tutto pronto",
      description: "Non devi inventare nulla da zero. I nostri kit ti danno tutti gli strumenti per iniziare.",
    },
    {
      icon: PartyPopper,
      title: "Divertimento garantito",
      description: "Organizzare attività insieme ad altri è un'esperienza gratificante e stimolante.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              Come funziona
            </Badge>
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
              Da un&apos;idea a un evento nel tuo quartiere
            </h1>
            <p className="mt-6 text-pretty text-lg text-muted-foreground">
              <strong>SDK</strong> sta per <strong>Social Development Kit</strong>: 
              un insieme di strumenti e risorse per aiutarti a organizzare attività 
              locali e creare connessioni autentiche nella tua comunità.
            </p>
          </div>
        </div>
        {/* Decorative gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* What is SDK Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border bg-card p-8 shadow-sm md:p-12">
              <h2 className="text-2xl font-bold md:text-3xl">
                Cos&apos;è SDK?
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  SDK è una piattaforma che mette a disposizione <strong className="text-foreground">starter kit</strong> per 
                  organizzare attività di quartiere: tornei sportivi, cineforum, swap party, 
                  gruppi di lettura, feste di vicinato e molto altro.
                </p>
                <p>
                  Ogni kit contiene guide pratiche, checklist e suggerimenti per 
                  trasformare un&apos;idea in un evento reale. Non serve esperienza: 
                  ti guidiamo passo dopo passo.
                </p>
                <p>
                  La cosa più importante? <strong className="text-foreground">Non devi fare tutto da solo</strong>. 
                  SDK ti aiuta a trovare altri giovani del tuo quartiere che vogliono 
                  collaborare. Insieme potete dividere i compiti e rendere l&apos;organizzazione 
                  più semplice e divertente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="border-y bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Come funziona in 5 passi</h2>
            <p className="mt-4 text-muted-foreground">
              Dall&apos;ispirazione all&apos;azione, ti accompagniamo in ogni fase
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-border md:left-1/2 md:-ml-px md:block" />

              <div className="space-y-8 md:space-y-12">
                {steps.map((step, index) => (
                  <div
                    key={step.number}
                    className={`relative flex flex-col gap-4 md:flex-row md:gap-8 ${
                      index % 2 === 1 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Content */}
                    <div className="flex-1 md:text-right">
                      <div
                        className={`rounded-xl border bg-card p-6 shadow-sm ${
                          index % 2 === 1 ? "md:text-left" : ""
                        }`}
                      >
                        <div className="mb-3 flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <step.icon className="h-5 w-5" />
                          </div>
                          <span className="text-sm font-medium text-muted-foreground">
                            Passo {step.number}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold">{step.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Center dot - desktop only */}
                    <div className="absolute left-1/2 top-6 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-background bg-primary md:block" />

                    {/* Spacer for alternating layout */}
                    <div className="hidden flex-1 md:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Perché usare SDK?</h2>
            <p className="mt-4 text-muted-foreground">
              Vantaggi concreti per te e il tuo quartiere
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-primary/5 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Pronto a iniziare?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Esplora gli starter kit disponibili e trova l&apos;attività giusta per il tuo quartiere
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/">
                  Esplora gli starter kit
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/#projects">Vedi progetti attivi</Link>
              </Button>
            </div>
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
              <Link href="/come-funziona" className="hover:text-foreground transition-colors">Come funziona</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Contatti</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
