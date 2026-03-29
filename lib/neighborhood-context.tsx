"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { neighborhoods } from "@/lib/data"

interface NeighborhoodContextType {
  selectedNeighborhood: string
  setSelectedNeighborhood: (neighborhood: string) => void
  neighborhoodName: string
}

const NeighborhoodContext = createContext<NeighborhoodContextType | undefined>(undefined)

export function NeighborhoodProvider({ children }: { children: ReactNode }) {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("all")

  const neighborhoodName = selectedNeighborhood === "all" 
    ? "Tutti i quartieri" 
    : selectedNeighborhood

  return (
    <NeighborhoodContext.Provider value={{ selectedNeighborhood, setSelectedNeighborhood, neighborhoodName }}>
      {children}
    </NeighborhoodContext.Provider>
  )
}

export function useNeighborhood() {
  const context = useContext(NeighborhoodContext)
  if (context === undefined) {
    throw new Error("useNeighborhood must be used within a NeighborhoodProvider")
  }
  return context
}

export { neighborhoods }
