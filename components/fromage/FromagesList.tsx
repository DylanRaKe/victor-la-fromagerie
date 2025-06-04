'use client'

import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FromageCard } from '@/components/fromage/FromageCard'
import { Fromage, TYPE_FROMAGE_LABELS, TYPE_LAIT_LABELS } from '@/types'
import { Search, Filter } from 'lucide-react'

interface FromagesListProps {
  fromages: Fromage[]
}

export function FromagesList({ fromages }: FromagesListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [laitFilter, setLaitFilter] = useState<string>('all')

  const fromagesFiltres = useMemo(() => {
    return fromages.filter(fromage => {
      const matchesSearch = fromage.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           fromage.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = typeFilter === 'all' || fromage.type === typeFilter
      const matchesLait = laitFilter === 'all' || fromage.lait === laitFilter
      
      return matchesSearch && matchesType && matchesLait
    })
  }, [fromages, searchTerm, typeFilter, laitFilter])

  return (
    <>
      {/* Filtres colorés */}
      <div className="cheese-card mb-8 animate-slide-up">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 cheese-gradient rounded-lg">
            <Filter className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold accent-text-gold">Filtrer votre sélection</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Recherche colorée */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 h-5 w-5" />
            <Input
              placeholder="Rechercher un fromage..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 border-2 border-orange-200 focus:border-orange-400 bg-white text-amber-900 placeholder:text-amber-600 rounded-xl h-12"
            />
          </div>

          {/* Filtre par type coloré */}
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="border-2 border-orange-200 focus:border-orange-400 bg-white text-amber-900 rounded-xl h-12">
              <SelectValue placeholder="Type de fromage" />
            </SelectTrigger>
            <SelectContent className="border-2 border-orange-200 bg-white">
              <SelectItem value="all" className="text-amber-900 hover:bg-orange-50">Tous les types</SelectItem>
              {Object.entries(TYPE_FROMAGE_LABELS).map(([key, label]) => (
                <SelectItem key={key} value={key} className="text-amber-900 hover:bg-orange-50">
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Filtre par lait coloré */}
          <Select value={laitFilter} onValueChange={setLaitFilter}>
            <SelectTrigger className="border-2 border-orange-200 focus:border-orange-400 bg-white text-amber-900 rounded-xl h-12">
              <SelectValue placeholder="Type de lait" />
            </SelectTrigger>
            <SelectContent className="border-2 border-orange-200 bg-white">
              <SelectItem value="all" className="text-amber-900 hover:bg-orange-50">Tous les laits</SelectItem>
              {Object.entries(TYPE_LAIT_LABELS).map(([key, label]) => (
                <SelectItem key={key} value={key} className="text-amber-900 hover:bg-orange-50">
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Résultats colorés */}
      <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="glass-card-cream inline-block px-4 py-2 rounded-full">
          <p className="text-orange-800 font-bold">
            {fromagesFiltres.length} fromage{fromagesFiltres.length > 1 ? 's' : ''} trouvé{fromagesFiltres.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Grille des fromages */}
      {fromagesFiltres.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {fromagesFiltres.map((fromage, index) => (
            <div 
              key={fromage.id}
              className="animate-slide-up"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <FromageCard fromage={fromage} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="cheese-card max-w-md mx-auto">
            <div className="p-3 cheese-gradient rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Search className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-amber-900 mb-2">
              Aucun fromage trouvé
            </h3>
            <p className="text-amber-700 font-medium mb-4">
              Aucun fromage ne correspond à vos critères de recherche.
            </p>
            <p className="text-amber-600 text-sm">
              Essayez de modifier vos filtres ou votre recherche.
            </p>
          </div>
        </div>
      )}
    </>
  )
} 