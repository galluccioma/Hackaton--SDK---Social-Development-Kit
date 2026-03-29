"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { X, SlidersHorizontal } from "lucide-react"
import { activityTypes } from "@/lib/data"
import { useState } from "react"

export interface FilterValues {
  activityType: string
  difficulty: string
  participants: [number, number]
  collaborators: [number, number]
}

interface FiltersProps {
  filters: FilterValues
  onFilterChange: (filters: FilterValues) => void
  onReset: () => void
}

export function Filters({ filters, onFilterChange, onReset }: FiltersProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const hasActiveFilters =
    filters.activityType !== "all" ||
    filters.difficulty !== "all" ||
    filters.participants[0] !== 0 ||
    filters.participants[1] !== 100 ||
    filters.collaborators[0] !== 0 ||
    filters.collaborators[1] !== 10

  const FilterContent = () => (
    <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-end">
      {/* Activity Type */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs text-muted-foreground">Tipo attività</Label>
        <Select
          value={filters.activityType}
          onValueChange={(value) => onFilterChange({ ...filters, activityType: value })}
        >
          <SelectTrigger className="w-full lg:w-[180px]">
            <SelectValue placeholder="Tutte" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutte le attività</SelectItem>
            {activityTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Difficulty */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs text-muted-foreground">Complessità di realizzazione</Label>
        <Select
          value={filters.difficulty}
          onValueChange={(value) => onFilterChange({ ...filters, difficulty: value })}
        >
          <SelectTrigger className="w-full lg:w-[140px]">
            <SelectValue placeholder="Tutte" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutte</SelectItem>
            <SelectItem value="easy">Facile</SelectItem>
            <SelectItem value="medium">Media</SelectItem>
            <SelectItem value="hard">Difficile</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Participants Range */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs text-muted-foreground">
          Partecipanti: {filters.participants[0]} - {filters.participants[1]}
        </Label>
        <div className="w-full px-2 lg:w-[180px]">
          <Slider
            value={filters.participants}
            onValueChange={(value) =>
              onFilterChange({ ...filters, participants: value as [number, number] })
            }
            min={0}
            max={100}
            step={5}
            className="py-2"
          />
        </div>
      </div>

      {/* Collaborators Range */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs text-muted-foreground">
          Collaboratori: {filters.collaborators[0]} - {filters.collaborators[1]}
        </Label>
        <div className="w-full px-2 lg:w-[160px]">
          <Slider
            value={filters.collaborators}
            onValueChange={(value) =>
              onFilterChange({ ...filters, collaborators: value as [number, number] })
            }
            min={0}
            max={10}
            step={1}
            className="py-2"
          />
        </div>
      </div>

      {/* Reset Button */}
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={onReset} className="gap-1.5">
          <X className="h-4 w-4" />
          Reset filtri
        </Button>
      )}
    </div>
  )

  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      {/* Mobile Toggle */}
      <div className="flex items-center justify-between lg:hidden">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center gap-2 text-sm font-medium"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtri
          {hasActiveFilters && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              !
            </span>
          )}
        </button>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onReset} className="gap-1.5">
            <X className="h-4 w-4" />
            Reset
          </Button>
        )}
      </div>

      {/* Mobile Filters */}
      <div className={`mt-4 lg:hidden ${showMobileFilters ? "block" : "hidden"}`}>
        <FilterContent />
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <FilterContent />
      </div>
    </div>
  )
}
