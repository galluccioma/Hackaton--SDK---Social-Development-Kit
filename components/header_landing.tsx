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
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground">
            S
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-none tracking-tight">SDK</span>
            <span className="text-[10px] text-muted-foreground leading-tight">Social Development Kit</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="#explore"
            className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Esplora
          </Link>
          <Link
            href="#come-funziona"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Come funziona
          </Link>
        </nav>

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
          </div>
        </div>
      )}
    </header>
  )
}
