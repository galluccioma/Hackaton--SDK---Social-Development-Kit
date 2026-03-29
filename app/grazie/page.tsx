"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  CheckCircle2, 
  Mail, 
  Users, 
  FileText, 
  ArrowLeft, 
  Share2, 
  Send,
  Download,
  Lightbulb
} from "lucide-react"

export default function SuccessPage() {
  const [mailSubmitted, setMailSubmitted] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header minimale */}
      <header className="border-b bg-card py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground text-lg">S</div>
            <span className="font-bold tracking-tight">SDK</span>
          </Link>
          <Link href="/landing" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Torna alla landing
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          
          {/* Header Ringraziamento */}
          <div className="text-center mb-12">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl text-balance">
              Grazie per il tuo contributo!
            </h1>
            <p className="text-lg text-muted-foreground text-pretty max-w-xl mx-auto">
              Siamo in fase di test a <strong>Torino</strong>. Il tuo feedback è fondamentale per le prossime fasi di sviluppo.
            </p>
          </div>

          <div className="grid gap-6">
            
            {/* BOX 1: Email (Newsletter/Contatto) */}
            <div className="rounded-2xl border bg-card p-6 md:p-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500" />
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1 space-y-4 w-full">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-500" />
                    <h3 className="text-xl font-bold">Rimaniamo in contatto</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Lasciaci la tua mail per ricevere gli aggiornamenti sulla disponibilità dei toolkit fisici.
                  </p>
                  
                  {!mailSubmitted ? (
                    <form onSubmit={(e) => { e.preventDefault(); setMailSubmitted(true); }} className="flex flex-col sm:flex-row gap-2">
                      <Input type="email" placeholder="la-tua@email.it" className="flex-1" required />
                      <Button type="submit" className="gap-2">
                        Avvisami <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  ) : (
                    <div className="py-2 text-blue-600 font-medium flex items-center gap-2 animate-in fade-in slide-in-from-left-2">
                      <CheckCircle2 className="h-4 w-4" /> Ti abbiamo inserito in lista!
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* BOX 2: Download Mini Guida */}
            <div className="rounded-2xl border bg-card p-6 md:p-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500" />
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <FileText className="h-5 w-5 text-amber-500" />
                    <h3 className="text-xl font-bold">Inizia subito</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Mentre prepariamo il kit completo, scarica la nostra <strong>Mini Guida Rapida</strong> per iniziare ad attivare i tuoi vicini.
                  </p>
                  <Button variant="outline" className="w-full sm:w-auto gap-2 border-amber-200 hover:bg-amber-50 dark:hover:bg-amber-950">
                    <Download className="h-4 w-4" /> Scarica PDF Gratuito
                  </Button>
                </div>
              </div>
            </div>

            {/* BOX 3: Feedback Attività */}
            <div className="rounded-2xl border bg-card p-6 md:p-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-bold">Aiutaci a scegliere</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Quali attività vorresti vedere nel tuo quartiere? (es. Cinema all&apos;aperto, tornei sportivi, swap party...)
                </p>

                {!feedbackSubmitted ? (
                  <form onSubmit={(e) => { e.preventDefault(); setFeedbackSubmitted(true); }} className="space-y-4">
                    <Textarea 
                      placeholder="Raccontaci brevemente cosa servirebbe nella tua zona..." 
                      className="min-h-[100px] resize-none focus-visible:ring-primary"
                      required
                    />
                    <Button type="submit" variant="secondary" className="w-full sm:w-auto">
                      Invia suggerimento
                    </Button>
                  </form>
                ) : (
                  <div className="py-6 text-center border rounded-xl border-dashed bg-muted/30 animate-in zoom-in-95">
                    <p className="text-sm font-medium text-primary">Grazie! Terremo conto della tua idea per i prossimi kit.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Social Share integrato */}
            <div className="mt-8 p-6 text-center bg-muted/20 rounded-2xl border border-dashed">
              <h4 className="text-sm font-bold flex items-center justify-center gap-2 mb-4">
                <Share2 className="h-4 w-4" /> CONDIVIDI IL PROGETTO
              </h4>
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="outline" size="sm" className="rounded-full">WhatsApp</Button>
                <Button variant="outline" size="sm" className="rounded-full">Telegram</Button>
                <Button variant="outline" size="sm" className="rounded-full">Copia Link</Button>
              </div>
            </div>

          </div>
        </div>
      </main>

      <footer className="py-8 border-t text-center text-xs text-muted-foreground mt-auto">
        © 2024 SDK - Social Development Kit | Torino, Italia
      </footer>
    </div>
  )
}