"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Building2, Trees, Check } from "lucide-react"
import type { Location } from "@/lib/data"

interface LocationMapProps {
  locations: Location[]
  selectedLocation: string | null
  onSelectLocation: (id: string) => void
}

export function LocationMap({
  locations,
  selectedLocation,
  onSelectLocation,
}: LocationMapProps) {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Map Placeholder */}
      <Card className="relative min-h-[300px] overflow-hidden lg:min-h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5">
          {/* Map Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Map Markers */}
          {locations.map((location, index) => {
            const isSelected = selectedLocation === location.id
            const isHovered = hoveredLocation === location.id
            // Position markers in a circular pattern for visual effect
            const angle = (index / locations.length) * 2 * Math.PI
            const radius = 30
            const centerX = 50
            const centerY = 50
            const x = centerX + radius * Math.cos(angle)
            const y = centerY + radius * Math.sin(angle)

            return (
              <button
                key={location.id}
                className={`absolute z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-200 ${
                  isSelected
                    ? "scale-125 bg-primary text-primary-foreground shadow-lg"
                    : isHovered
                      ? "scale-110 bg-primary/80 text-primary-foreground"
                      : "bg-card text-foreground shadow-md hover:bg-primary/20"
                }`}
                style={{ left: `${x}%`, top: `${y}%` }}
                onClick={() => onSelectLocation(location.id)}
                onMouseEnter={() => setHoveredLocation(location.id)}
                onMouseLeave={() => setHoveredLocation(null)}
              >
                <MapPin className="h-4 w-4" />
              </button>
            )
          })}

          {/* Center Label */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-sm font-medium text-muted-foreground">Torino</p>
            <p className="text-xs text-muted-foreground">Clicca su un marker</p>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-3 left-3 rounded-lg bg-card/90 px-3 py-2 text-xs backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span>Location selezionata</span>
          </div>
        </div>
      </Card>

      {/* Location List */}
      <div className="space-y-3">
        <h3 className="font-semibold">Scegli una location</h3>
        <div className="space-y-2">
          {locations.map((location) => {
            const isSelected = selectedLocation === location.id
            return (
              <Card
                key={location.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  isSelected ? "border-primary ring-2 ring-primary/20" : ""
                }`}
                onClick={() => onSelectLocation(location.id)}
                onMouseEnter={() => setHoveredLocation(location.id)}
                onMouseLeave={() => setHoveredLocation(null)}
              >
                <CardContent className="flex items-center gap-4 p-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                      isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {location.type === "indoor" ? (
                      <Building2 className="h-5 w-5" />
                    ) : (
                      <Trees className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{location.name}</h4>
                      {isSelected && <Check className="h-4 w-4 text-primary" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{location.address}</p>
                    <div className="mt-1 flex items-center gap-3">
                      <Badge variant="secondary" className="text-xs">
                        {location.type === "indoor" ? "Indoor" : "Outdoor"}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" />
                        Max {location.capacity} persone
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {selectedLocation && (
          <Button className="w-full">Conferma location selezionata</Button>
        )}
      </div>
    </div>
  )
}
