'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CRENEAUX_DISPONIBLES, CreneauRetrait } from '@/types'
import { Calendar, Clock } from 'lucide-react'
import { format, addDays, isSameDay } from 'date-fns'
import { fr } from 'date-fns/locale'

interface CreneauSelectorProps {
  selectedCreneau: CreneauRetrait | null
  onCreneauChange: (creneau: CreneauRetrait) => void
}

export function CreneauSelector({ selectedCreneau, onCreneauChange }: CreneauSelectorProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Générer les 7 prochains jours (en excluant les dimanches)
  const getAvailableDates = () => {
    const dates = []
    let currentDate = new Date()
    
    while (dates.length < 7) {
      // Exclure les dimanches (0 = dimanche)
      if (currentDate.getDay() !== 0) {
        dates.push(new Date(currentDate))
      }
      currentDate = addDays(currentDate, 1)
    }
    
    return dates
  }

  const availableDates = getAvailableDates()

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    // Reset le créneau sélectionné quand on change de date
    if (selectedCreneau && !isSameDay(selectedCreneau.date, date)) {
      // Ne pas reset automatiquement, laisser l'utilisateur choisir
    }
  }

  const handleCreneauSelect = (heureDebut: string, heureFin: string) => {
    if (!selectedDate) return
    
    const creneau: CreneauRetrait = {
      date: selectedDate,
      heureDebut,
      heureFin
    }
    
    onCreneauChange(creneau)
  }

  const isCreneauSelected = (heureDebut: string, heureFin: string) => {
    return selectedCreneau &&
           selectedDate &&
           isSameDay(selectedCreneau.date, selectedDate) &&
           selectedCreneau.heureDebut === heureDebut &&
           selectedCreneau.heureFin === heureFin
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <span>Choisir un créneau de retrait</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sélection de la date */}
        <div>
          <h4 className="font-medium mb-3">Sélectionnez une date</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {availableDates.map((date) => (
              <Button
                key={date.toISOString()}
                variant={selectedDate && isSameDay(date, selectedDate) ? "default" : "outline"}
                onClick={() => handleDateSelect(date)}
                className="flex flex-col h-auto p-3"
              >
                <span className="text-xs font-normal">
                  {format(date, 'EEE', { locale: fr })}
                </span>
                <span className="text-sm font-medium">
                  {format(date, 'd MMM', { locale: fr })}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Sélection de l'heure */}
        {selectedDate && (
          <div>
            <h4 className="font-medium mb-3 flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Choisissez un horaire</span>
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {CRENEAUX_DISPONIBLES.map((creneau) => (
                <Button
                  key={`${creneau.heureDebut}-${creneau.heureFin}`}
                  variant={isCreneauSelected(creneau.heureDebut, creneau.heureFin) ? "default" : "outline"}
                  onClick={() => handleCreneauSelect(creneau.heureDebut, creneau.heureFin)}
                  className="text-sm"
                >
                  {creneau.heureDebut} - {creneau.heureFin}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Créneau sélectionné */}
        {selectedCreneau && (
          <div className="p-4 bg-accent/20 rounded-lg">
            <h4 className="font-medium mb-2">Créneau sélectionné</h4>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">
                {format(selectedCreneau.date, 'EEEE d MMMM yyyy', { locale: fr })}
              </Badge>
              <Badge variant="outline">
                {selectedCreneau.heureDebut} - {selectedCreneau.heureFin}
              </Badge>
            </div>
          </div>
        )}

        {/* Informations */}
        <div className="text-sm text-muted-foreground space-y-1">
          <p>• Horaires d&apos;ouverture : Lundi-Vendredi 9h-18h, Samedi 9h-17h</p>
          <p>• Votre commande sera préparée pour l&apos;heure choisie</p>
          <p>• Pensez à apporter une pièce d&apos;identité</p>
        </div>
      </CardContent>
    </Card>
  )
} 