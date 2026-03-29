"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import { LocationMap } from "@/components/location-map"
import { locations } from "@/lib/data"

export function KitMapSection() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <MapPin className="h-5 w-5" />
          Seleziona una location
        </CardTitle>
      </CardHeader>
      <CardContent>
        <LocationMap
          locations={locations}
          selectedLocation={selectedLocation}
          onSelectLocation={setSelectedLocation}
        />
      </CardContent>
    </Card>
  )
}