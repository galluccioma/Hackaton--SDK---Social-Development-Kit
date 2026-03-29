"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Menu, X, User, MapPin } from "lucide-react"
import { useState } from "react"
import { useNeighborhood, neighborhoods } from "@/lib/neighborhood-context"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { selectedNeighborhood, setSelectedNeighborhood, neighborhoodName } = useNeighborhood()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-none tracking-tight">KIT<span className="text-primary">&</span>GO</span>
            <span className="text-[10px] text-muted-foreground leading-tight">Social Development Kit</span>
          </div>
        </Link>

        {/* Neighborhood Switcher - Desktop */}
        <div className="hidden md:flex items-center">
          <Select value={selectedNeighborhood} onValueChange={setSelectedNeighborhood}>
            <SelectTrigger className="w-auto gap-2 border-0 bg-transparent px-3 py-2 text-sm font-medium shadow-none hover:bg-muted/50 focus:ring-0 focus:ring-offset-0">
              <MapPin className="h-4 w-4 text-primary" />
              <SelectValue>{neighborhoodName}</SelectValue>
            </SelectTrigger>
            <SelectContent align="center">
              <SelectItem value="all">Tutti i quartieri</SelectItem>
              {neighborhoods.map((n) => (
                <SelectItem key={n} value={n}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/"
            className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Esplora
          </Link>
          <Link
            href="/come-funziona"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Come funziona
          </Link>
          <Link
            href="/#projects"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Progetti
          </Link>
          <Link
            href="/dashboard"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            I miei gruppi
          </Link>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" className="gap-2" asChild>
            <Link href="/dashboard">
              <User className="h-4 w-4" />
              Accedi
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/#create">Inizia un&apos;attività</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t bg-background md:hidden">
          <div className="container mx-auto px-4 py-4">
            {/* Mobile Neighborhood Switcher */}
            <div className="mb-4 pb-4 border-b">
              <label className="text-xs font-medium text-muted-foreground mb-2 block">
                Quartiere selezionato
              </label>
              <Select value={selectedNeighborhood} onValueChange={setSelectedNeighborhood}>
                <SelectTrigger className="w-full">
                  <MapPin className="h-4 w-4 text-primary mr-2" />
                  <SelectValue>{neighborhoodName}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti i quartieri</SelectItem>
                  {neighborhoods.map((n) => (
                    <SelectItem key={n} value={n}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <nav className="flex flex-col">
              <Link
                href="/"
                className="py-2.5 text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Esplora
              </Link>
              <Link
                href="/come-funziona"
                className="py-2.5 text-sm font-medium text-muted-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Come funziona
              </Link>
              <Link
                href="/#projects"
                className="py-2.5 text-sm font-medium text-muted-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Progetti
              </Link>
              <Link
                href="/dashboard"
                className="py-2.5 text-sm font-medium text-muted-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                I miei gruppi
              </Link>
            </nav>
            <div className="flex flex-col gap-2 pt-4 border-t mt-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard">
                  <User className="h-4 w-4" />
                  Accedi
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/#create">Inizia un&apos;attività</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
