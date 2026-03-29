"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  CheckCircle2, 
  Mail, 
  Users, 
  FileText, 
  ArrowLeft, 
  Share2, 
  Send 
} from "lucide-react"

export default function SuccessPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // Logica di invio dati qui
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header minimale */}
      <header className="border-b bg-card py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground text-lg">S</div>
            <span className="font-bold tracking-tight">SDK</span>
          </Link>
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Torna alla home
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-2xl">
          
          {/* Messaggio di Ringraziamento */}
          <div className="text-center mb-12">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl text-balance">
              Grazie per il tuo contributo!
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Siamo in fase di test a <strong>Torino</strong>. <br/> Il tuo feedback per noi è molto importante e sarà tenuto in considerazione per le successive fasi di sviluppo.
            </p>
          </div>

          {/* Download Guida */}
          {/* <div className="mb-12 rounded-2xl border bg-primary/5 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="h-16 w-16 flex-shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <FileText className="h-8 w-8" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-bold text-lg">Inizia subito a muoverti</h3>
              <p className="text-sm text-muted-foreground">Scarica la guida PDF gratuita: &quot;Come parlare con il tuo coordinatore di quartiere&quot;.</p>
            </div>
            <Button variant="default" className="w-full md:w-auto gap-2">
              <ArrowLeft className="h-4 w-4 rotate-90" /> Scarica PDF
            </Button>
          </div> */}

          {/* Form Collaboratori */}
          <div className="rounded-2xl border bg-card p-6 md:p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            
            <div className="mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Non dimenticarti di noi, lasciaci la tua mail!
              </h2>
              <p className="mt-2 text-muted-foreground">
              Ti ricontatteremo per i prossimi aggiornamenti!
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">La tua email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input type="email" placeholder="tu@email.it" className="pl-10" required />
                  </div>
                </div>


                <Button type="submit" className="w-full h-12 text-md font-semibold gap-2 mt-4">
                  Invia e conferma interesse <Send className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <div className="py-8 text-center animate-in fade-in zoom-in duration-300">
                <p className="text-green-600 font-bold text-lg">Richiesta inviata con successo!</p>
                <p className="text-sm text-muted-foreground">Controlla la tua casella di posta.</p>
              </div>
            )}

            {/* Social Share */}
          <div className="mt-12 text-center">
            <div className="mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Nel frattempo non dimenticarti di noi !
              </h2>
            </div>
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="icon" className="rounded-full">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="rounded-full px-6">
                WhatsApp
              </Button>
              <Button variant="outline" className="rounded-full px-6">
                Telegram
              </Button>
            </div>
          </div>
          </div>


        </div>
      </main>

      <footer className="py-8 border-t text-center text-xs text-muted-foreground">
        © 2024 SDK - Social Development Kit | Torino, Italia
      </footer>
    </div>
  )
}