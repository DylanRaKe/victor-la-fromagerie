'use client'

import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Commande, StatutCommande, STATUT_COMMANDE_LABELS } from '@/types'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { User, Calendar, Package, Mail, Phone, ShoppingBag, Euro, Clock, Crown } from 'lucide-react'

interface CommandeDetailsProps {
  commande: Commande | null
  isOpen: boolean
  onClose: () => void
}

export function CommandeDetails({ commande, isOpen, onClose }: CommandeDetailsProps) {
  if (!commande) return null

  const getStatusBadgeStyle = (statut: StatutCommande) => {
    switch (statut) {
      case StatutCommande.EN_ATTENTE:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case StatutCommande.PREPAREE:
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case StatutCommande.RETIREE:
        return 'bg-green-100 text-green-800 border-green-200'
      case StatutCommande.ANNULEE:
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-white border-2 border-gray-300 shadow-2xl">
        <DialogHeader className="pb-6 bg-orange-50 border-b-2 border-orange-200 -m-6 mb-6 p-6">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-3xl font-bold text-gray-800 flex items-center space-x-3">
              <div className="p-3 bg-orange-100 rounded-lg border border-orange-200">
                <Crown className="h-8 w-8 text-orange-600" />
              </div>
              <span>Commande #{commande.id}</span>
            </DialogTitle>
            <div className={`px-6 py-3 rounded-lg font-bold text-lg border-2 ${getStatusBadgeStyle(commande.statut)}`}>
              {STATUT_COMMANDE_LABELS[commande.statut]}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 p-6">
          {/* Informations générales simplifiées */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Client */}
            <Card className="bg-white border-2 border-blue-200 shadow-lg">
              <CardHeader className="bg-blue-50 border-b-2 border-blue-200">
                <CardTitle className="flex items-center space-x-3 text-gray-800">
                  <div className="p-2 bg-blue-100 rounded-lg border border-blue-200">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <span>Informations client</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div>
                  <p className="font-bold text-2xl text-gray-800">
                    {commande.client.prenom} {commande.client.nom}
                  </p>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <p className="font-medium text-gray-700">{commande.client.email}</p>
                </div>
                {commande.client.telephone && (
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <p className="font-medium text-gray-700">{commande.client.telephone}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Créneau de retrait */}
            <Card className="bg-white border-2 border-green-200 shadow-lg">
              <CardHeader className="bg-green-50 border-b-2 border-green-200">
                <CardTitle className="flex items-center space-x-3 text-gray-800">
                  <div className="p-2 bg-green-100 rounded-lg border border-green-200">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <span>Créneau de retrait</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div>
                  <p className="font-bold text-2xl text-gray-800">
                    {format(commande.creneauRetrait.date, 'EEEE d MMMM yyyy', { locale: fr })}
                  </p>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <Clock className="h-5 w-5 text-green-600" />
                  <p className="font-bold text-lg text-gray-700">
                    {commande.creneauRetrait.heureDebut} - {commande.creneauRetrait.heureFin}
                  </p>
                </div>
                <div className="text-sm font-medium text-gray-600 bg-green-50 p-3 rounded-lg border border-green-200">
                  <p>Commande créée le {format(commande.dateCreation, 'dd/MM/yyyy à HH:mm')}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Articles commandés simplifiés */}
          <Card className="bg-white border-2 border-purple-200 shadow-lg">
            <CardHeader className="bg-purple-50 border-b-2 border-purple-200">
              <CardTitle className="flex items-center space-x-3 text-gray-800">
                <div className="p-2 bg-purple-100 rounded-lg border border-purple-200">
                  <Package className="h-6 w-6 text-purple-600" />
                </div>
                <span>Articles commandés</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {commande.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    {/* Image */}
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.fromage.image}
                        alt={item.fromage.nom}
                        fill
                        className="object-cover rounded-lg border border-gray-300"
                        sizes="80px"
                      />
                    </div>

                    {/* Informations */}
                    <div className="flex-1">
                      <h4 className="font-bold text-xl text-gray-800">{item.fromage.nom}</h4>
                      <p className="text-sm font-medium text-gray-600">
                        {item.prixUnitaire.toFixed(2)}€ / {item.fromage.poids}g
                      </p>
                    </div>

                    {/* Quantité */}
                    <div className="text-center">
                      <div className="p-3 bg-purple-100 rounded-lg border border-purple-200">
                        <p className="font-bold text-purple-700">Qté: {item.quantite}</p>
                      </div>
                    </div>

                    {/* Prix total */}
                    <div className="text-right min-w-0">
                      <p className="font-bold text-2xl text-orange-600">
                        {(item.prixUnitaire * item.quantite).toFixed(2)}€
                      </p>
                    </div>
                  </div>
                ))}

                {/* Total */}
                <div className="border-t-2 border-gray-300 pt-6 mt-6">
                  <div className="flex justify-between items-center p-6 bg-orange-100 rounded-lg border-2 border-orange-200 shadow-sm">
                    <span className="text-2xl font-bold text-gray-800">Total de la commande</span>
                    <span className="text-4xl font-bold text-orange-600">{commande.total.toFixed(2)}€</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Résumé simplifié */}
          <Card className="bg-white border-2 border-gray-200 shadow-lg">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="w-12 h-12 bg-purple-100 rounded-full mx-auto mb-3 flex items-center justify-center border border-purple-200">
                    <ShoppingBag className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="text-3xl font-bold text-gray-800">
                    {commande.items.reduce((total, item) => total + item.quantite, 0)}
                  </p>
                  <p className="text-sm font-bold text-gray-600">Articles</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center border border-green-200">
                    <Package className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-3xl font-bold text-gray-800">
                    {commande.items.length}
                  </p>
                  <p className="text-sm font-bold text-gray-600">Fromages</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="w-12 h-12 bg-orange-100 rounded-full mx-auto mb-3 flex items-center justify-center border border-orange-200">
                    <Euro className="h-6 w-6 text-orange-600" />
                  </div>
                  <p className="text-3xl font-bold text-orange-600">
                    {commande.total.toFixed(2)}€
                  </p>
                  <p className="text-sm font-bold text-gray-600">Total</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center border border-gray-200">
                    <Crown className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className={`px-3 py-1 rounded-lg font-bold text-sm mx-auto inline-block border-2 ${getStatusBadgeStyle(commande.statut)}`}>
                    {STATUT_COMMANDE_LABELS[commande.statut]}
                  </div>
                  <p className="text-sm font-bold text-gray-600 mt-2">Statut</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
} 