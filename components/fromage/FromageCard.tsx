'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Star, Sparkles } from 'lucide-react'
import { Fromage, TYPE_FROMAGE_LABELS, TYPE_LAIT_LABELS } from '@/types'
import { usePanierStore } from '@/lib/store'

interface FromageCardProps {
  fromage: Fromage
  showAddToCart?: boolean
}

export function FromageCard({ fromage, showAddToCart = true }: FromageCardProps) {
  const ajouterAuPanier = usePanierStore((state) => state.ajouterAuPanier)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    ajouterAuPanier(fromage, 1)
  }

  return (
    <div className="cheese-card group overflow-hidden hover-lift-cheese">
      <Link href={`/fromages/${fromage.id}`}>
        {/* Image avec overlay coloré */}
        <div className="relative h-48 mb-4 overflow-hidden rounded-xl bg-orange-50">
          <Image
            src={fromage.image}
            alt={fromage.nom}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Overlay gradient au survol */}
          <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Badge type de lait coloré */}
          <div className="absolute top-3 left-3">
            <Badge className="glass-card-cream text-orange-800 border-orange-300 text-xs font-bold">
              {TYPE_LAIT_LABELS[fromage.lait]}
            </Badge>
          </div>

          {/* Badge type de fromage coloré */}
          <div className="absolute top-3 right-3">
            <Badge className="herb-gradient text-green-800 border-green-300 text-xs font-bold">
              {TYPE_FROMAGE_LABELS[fromage.type]}
            </Badge>
          </div>

          {/* Indicateur de qualité */}
          <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center space-x-1 glass-card-cream px-2 py-1 rounded-full">
              <Sparkles className="h-3 w-3 text-yellow-500" />
              <span className="text-xs font-bold text-orange-800">Premium</span>
            </div>
          </div>
        </div>

        {/* Contenu coloré */}
        <div className="space-y-4">
          {/* Nom et note */}
          <div className="flex items-start justify-between">
            <h3 className="font-bold text-lg text-amber-900 group-hover:text-orange-600 transition-colors duration-300">
              {fromage.nom}
            </h3>
            <div className="flex items-center space-x-1 ml-2">
              <Star className="h-4 w-4 text-yellow-500 fill-current animate-float" />
              <span className="text-sm text-amber-700 font-bold">4.8</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-amber-700 text-sm line-clamp-2 leading-relaxed font-medium">
            {fromage.description}
          </p>

          {/* Prix et poids avec design amélioré */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xl font-bold accent-text-gold">
                {fromage.prix.toFixed(2)} €
              </div>
              <div className="text-sm text-amber-600 font-medium bg-orange-100 px-2 py-1 rounded-full">
                {fromage.poids}g
              </div>
            </div>
            
            {showAddToCart && (
              <button
                onClick={handleAddToCart}
                disabled={!fromage.disponible}
                className={`
                  px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 flex items-center space-x-2
                  ${fromage.disponible 
                    ? 'glass-button hover-scale-warm' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                <ShoppingCart className="h-4 w-4" />
                <span>{fromage.disponible ? 'Ajouter' : 'Indisponible'}</span>
              </button>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
} 