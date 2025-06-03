'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PanierRecap } from '@/components/panier/PanierRecap'
import { CreneauSelector } from '@/components/panier/CreneauSelector'
import { ClientForm } from '@/components/forms/ClientForm'
import { usePanierStore } from '@/lib/store'
import { CreneauRetrait, InfoClient } from '@/types'
import { ArrowLeft, ShoppingCart } from 'lucide-react'

export default function PanierPage() {
  const router = useRouter()
  const { items, calculerTotal, viderPanier } = usePanierStore()
  const [selectedCreneau, setSelectedCreneau] = useState<CreneauRetrait | null>(null)
  const [clientInfo, setClientInfo] = useState<InfoClient | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isFormComplete = () => {
    return items.length > 0 &&
           selectedCreneau &&
           clientInfo &&
           clientInfo.nom.trim() &&
           clientInfo.prenom.trim() &&
           clientInfo.email.trim() &&
           /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientInfo.email)
  }

  const handleSubmitOrder = async () => {
    if (!isFormComplete()) return

    setIsSubmitting(true)

    try {
      // Ici on simule l'envoi de la commande
      // Dans un vrai projet, on ferait un appel API
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Vider le panier
      viderPanier()

      // Rediriger vers la page de confirmation
      router.push('/confirmation')
    } catch (error) {
      console.error('Erreur lors de la validation de la commande:', error)
      // Ici on pourrait afficher une notification d'erreur
    } finally {
      setIsSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
          <p className="text-muted-foreground mb-6">
            Découvrez notre sélection de fromages artisanaux pour commencer votre commande.
          </p>
          <Button asChild>
            <Link href="/fromages">
              Voir nos fromages
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link 
          href="/fromages" 
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Continuer mes achats
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold">Mon panier</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-8">
          {/* Récapitulatif du panier */}
          <PanierRecap />

          {/* Sélection du créneau */}
          <CreneauSelector 
            selectedCreneau={selectedCreneau}
            onCreneauChange={setSelectedCreneau}
          />

          {/* Formulaire client */}
          <ClientForm 
            clientInfo={clientInfo}
            onClientInfoChange={setClientInfo}
          />
        </div>

        {/* Sidebar - Résumé et validation */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* Résumé de commande */}
            <div className="bg-card border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Résumé de la commande</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{calculerTotal().toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Retrait en magasin</span>
                  <span>Gratuit</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-primary">{calculerTotal().toFixed(2)}€</span>
                </div>
              </div>

              {/* Informations du créneau sélectionné */}
              {selectedCreneau && (
                <div className="mb-6 p-3 bg-accent/20 rounded-lg">
                  <p className="text-sm font-medium mb-1">Créneau de retrait</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedCreneau.date.toLocaleDateString('fr-FR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedCreneau.heureDebut} - {selectedCreneau.heureFin}
                  </p>
                </div>
              )}

              {/* Bouton de validation */}
              <Button 
                onClick={handleSubmitOrder}
                disabled={!isFormComplete() || isSubmitting}
                className="w-full"
                size="lg"
              >
                {isSubmitting ? 'Validation en cours...' : 'Valider ma commande'}
              </Button>

              {!isFormComplete() && (
                <div className="mt-3 text-sm text-muted-foreground">
                  {!selectedCreneau && <p>• Sélectionnez un créneau de retrait</p>}
                  {!clientInfo?.nom && <p>• Renseignez votre nom</p>}
                  {!clientInfo?.prenom && <p>• Renseignez votre prénom</p>}
                  {!clientInfo?.email && <p>• Renseignez votre email</p>}
                  {clientInfo?.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientInfo.email) && (
                    <p>• Format d&apos;email invalide</p>
                  )}
                </div>
              )}
            </div>

            {/* Informations pratiques */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium mb-2">Informations pratiques</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Retrait gratuit en magasin</p>
                <p>• Commande préparée à l&apos;heure choisie</p>
                <p>• Confirmation par email</p>
                <p>• Paiement sur place</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 