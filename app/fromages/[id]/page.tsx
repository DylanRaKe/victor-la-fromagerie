'use client'

import { useState, use } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { QuantitySelector } from '@/components/fromage/QuantitySelector'
import { fromagesData } from '@/data/fromages'
import { TYPE_FROMAGE_LABELS, TYPE_LAIT_LABELS } from '@/types'
import { usePanierStore } from '@/lib/store'
import { ArrowLeft, ShoppingCart, Package, Milk, Scale, Star, Award, Sparkles } from 'lucide-react'

interface FromageDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default function FromageDetailPage({ params }: FromageDetailPageProps) {
  const [quantity, setQuantity] = useState(1)
  const ajouterAuPanier = usePanierStore((state) => state.ajouterAuPanier)
  
  // Unwrap params using React.use()
  const { id } = use(params)
  const fromage = fromagesData.find(f => f.id === id)
  
  if (!fromage) {
    notFound()
  }

  const handleAddToCart = () => {
    ajouterAuPanier(fromage, quantity)
    // Optionnel : afficher une notification de succès
  }

  const maxQuantity = fromage.stock ? Math.min(fromage.stock, 10) : 10

  return (
    <div className="min-h-screen warm-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb coloré */}
        <div className="mb-8 animate-fade-in">
          <Link 
            href="/fromages" 
            className="inline-flex items-center glass-card-cream text-orange-800 hover:text-orange-600 transition-all duration-300 px-4 py-2 rounded-full font-medium hover-lift-cheese"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux fromages
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image avec design amélioré */}
          <div className="space-y-4 animate-slide-in-left">
            <div className="relative aspect-square overflow-hidden rounded-2xl border-4 border-orange-200 bg-orange-50">
              <Image
                src={fromage.image}
                alt={fromage.nom}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {!fromage.disponible && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge className="text-lg px-6 py-3 bg-red-500 text-white border-0">
                    Indisponible
                  </Badge>
                </div>
              )}
              
              {/* Badge qualité premium */}
              <div className="absolute top-4 right-4">
                <div className="glass-card-cream px-3 py-2 rounded-full flex items-center space-x-2">
                  <Award className="h-4 w-4 text-yellow-500" />
                  <span className="text-xs font-bold text-orange-800">Premium</span>
                </div>
              </div>
            </div>
          </div>

          {/* Informations colorées */}
          <div className="space-y-8 animate-slide-in-right">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-amber-900">
                {fromage.nom}
              </h1>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge className="glass-card-cream text-orange-800 border-orange-300 px-4 py-2 text-sm font-bold">
                  {TYPE_FROMAGE_LABELS[fromage.type]}
                </Badge>
                <Badge className="herb-gradient text-green-800 border-green-300 px-4 py-2 text-sm font-bold">
                  {TYPE_LAIT_LABELS[fromage.lait]}
                </Badge>
                {fromage.stock && fromage.stock <= 5 && (
                  <Badge className="bg-red-100 text-red-800 border-red-300 px-4 py-2 text-sm font-bold">
                    Stock limité
                  </Badge>
                )}
              </div>

              {/* Note et avis */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <span className="text-amber-700 font-bold">4.8/5</span>
                <span className="text-amber-600">(127 avis)</span>
              </div>

              <p className="text-amber-800 text-lg leading-relaxed font-medium">
                {fromage.description}
              </p>
            </div>

            {/* Caractéristiques colorées */}
            <Card className="cheese-card border-2 border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 cheese-gradient rounded-lg">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-xl accent-text-gold">Caractéristiques</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-orange-50 transition-colors">
                    <div className="p-2 glass-card-cream rounded-lg">
                      <Scale className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-amber-600 font-medium">Poids</p>
                      <p className="font-bold text-amber-900">{fromage.poids}g</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-orange-50 transition-colors">
                    <div className="p-2 glass-card-cream rounded-lg">
                      <Milk className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-amber-600 font-medium">Lait</p>
                      <p className="font-bold text-amber-900">{TYPE_LAIT_LABELS[fromage.lait]}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-orange-50 transition-colors">
                    <div className="p-2 glass-card-cream rounded-lg">
                      <Package className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-amber-600 font-medium">Stock</p>
                      <p className="font-bold text-amber-900">
                        {fromage.disponible ? 
                          (fromage.stock ? `${fromage.stock} disponibles` : 'Disponible') : 
                          'Indisponible'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prix et ajout au panier colorés */}
            <div className="space-y-6">
              <div className="flex items-baseline space-x-3">
                <span className="text-4xl font-bold accent-text-gold">
                  {fromage.prix.toFixed(2)}€
                </span>
                <span className="text-amber-600 font-medium bg-orange-100 px-3 py-1 rounded-full">
                  / {fromage.poids}g
                </span>
              </div>

              {fromage.disponible && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-bold mb-3 text-amber-900">
                      Quantité
                    </label>
                    <QuantitySelector
                      value={quantity}
                      onChange={setQuantity}
                      max={maxQuantity}
                      disabled={!fromage.disponible}
                    />
                  </div>

                  <button 
                    onClick={handleAddToCart}
                    className="glass-button w-full text-lg py-4 flex items-center justify-center space-x-3 hover-scale-warm"
                  >
                    <ShoppingCart className="h-6 w-6" />
                    <span>Ajouter au panier - {(fromage.prix * quantity).toFixed(2)}€</span>
                  </button>
                </div>
              )}

              {!fromage.disponible && (
                <div className="text-center py-6">
                  <div className="cheese-card max-w-sm mx-auto">
                    <p className="text-amber-800 font-medium mb-4">
                      Ce fromage n&apos;est actuellement pas disponible.
                    </p>
                    <Link href="/fromages">
                      <button className="glass-button-secondary w-full">
                        Voir d&apos;autres fromages
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 