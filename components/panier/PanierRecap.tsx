'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { QuantitySelector } from '@/components/fromage/QuantitySelector'
import { usePanierStore } from '@/lib/store'
import { Trash2 } from 'lucide-react'

export function PanierRecap() {
  const { items, modifierQuantite, retirerDuPanier, calculerTotal } = usePanierStore()

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground text-lg mb-4">
            Votre panier est vide
          </p>
          <p className="text-muted-foreground text-sm">
            Ajoutez des fromages depuis notre catalogue pour commencer votre commande.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Récapitulatif de votre commande</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.fromage.id} className="flex items-center space-x-4 p-4 border rounded-lg">
            {/* Image */}
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src={item.fromage.image}
                alt={item.fromage.nom}
                fill
                className="object-cover rounded"
                sizes="64px"
              />
            </div>

            {/* Informations */}
            <div className="flex-1 min-w-0">
              <h4 className="font-medium truncate">{item.fromage.nom}</h4>
              <p className="text-sm text-muted-foreground">
                {item.prixUnitaire.toFixed(2)}€ / {item.fromage.poids}g
              </p>
            </div>

            {/* Quantité */}
            <div className="flex items-center space-x-2">
              <QuantitySelector
                value={item.quantite}
                onChange={(newQuantity) => modifierQuantite(item.fromage.id, newQuantity)}
                max={item.fromage.stock || 10}
              />
            </div>

            {/* Prix total */}
            <div className="text-right min-w-0">
              <p className="font-medium">
                {(item.prixUnitaire * item.quantite).toFixed(2)}€
              </p>
            </div>

            {/* Supprimer */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => retirerDuPanier(item.fromage.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}

        {/* Total */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total</span>
            <span className="text-primary">{calculerTotal().toFixed(2)}€</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 