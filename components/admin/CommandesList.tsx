'use client'

import { useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Commande, StatutCommande, STATUT_COMMANDE_LABELS } from '@/types'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Eye, Package, CheckCircle, User, Calendar, ShoppingBag, Euro, Filter, Clock } from 'lucide-react'

interface CommandesListProps {
  commandes: Commande[]
  onStatusChange: (commandeId: string, newStatus: StatutCommande) => void
  onViewDetails: (commande: Commande) => void
}

export function CommandesList({ commandes, onStatusChange, onViewDetails }: CommandesListProps) {
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredCommandes = commandes.filter(commande => {
    if (statusFilter === 'all') return true
    return commande.statut === statusFilter
  })

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
    <div className="space-y-6">
      {/* Filtres simplifiés */}
      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-orange-100 rounded-lg border border-orange-200">
            <Filter className="h-4 w-4 text-orange-600" />
          </div>
          <span className="font-bold text-gray-700">Filtrer par statut :</span>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48 border-2 border-gray-300 focus:border-orange-400 shadow-sm">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les commandes</SelectItem>
            {Object.entries(STATUT_COMMANDE_LABELS).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 border border-green-200 rounded-lg shadow-sm">
          <ShoppingBag className="h-4 w-4 text-green-600" />
          <span className="text-sm font-bold text-green-700">
            {filteredCommandes.length} commande{filteredCommandes.length > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Liste des commandes simplifiées */}
      <div className="space-y-4">
        {filteredCommandes.map((commande) => (
          <Card key={commande.id} className="bg-white border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gray-50 border-b-2 border-gray-200 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg border border-blue-200">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                  <span>Commande #{commande.id}</span>
                </CardTitle>
                <div className={`px-4 py-2 rounded-lg font-bold text-sm border-2 ${getStatusBadgeStyle(commande.statut)}`}>
                  {STATUT_COMMANDE_LABELS[commande.statut]}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Client */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg border border-blue-200">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-sm text-gray-700">Client</h4>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <p className="font-bold text-lg text-gray-800">
                      {commande.client.prenom} {commande.client.nom}
                    </p>
                    <p className="text-sm font-medium text-gray-600">{commande.client.email}</p>
                    {commande.client.telephone && (
                      <p className="text-sm font-medium text-gray-600">{commande.client.telephone}</p>
                    )}
                  </div>
                </div>

                {/* Créneau */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="p-2 bg-green-100 rounded-lg border border-green-200">
                      <Calendar className="h-4 w-4 text-green-600" />
                    </div>
                    <h4 className="font-bold text-sm text-gray-700">Retrait</h4>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="font-bold text-lg text-gray-800">
                      {format(commande.creneauRetrait.date, 'EEEE d MMMM', { locale: fr })}
                    </p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Clock className="h-3 w-3 text-green-600" />
                      <p className="text-sm font-medium text-gray-600">
                        {commande.creneauRetrait.heureDebut} - {commande.creneauRetrait.heureFin}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Articles */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="p-2 bg-purple-100 rounded-lg border border-purple-200">
                      <ShoppingBag className="h-4 w-4 text-purple-600" />
                    </div>
                    <h4 className="font-bold text-sm text-gray-700">Articles</h4>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                    <p className="font-bold text-lg text-gray-800">
                      {commande.items.reduce((total, item) => total + item.quantite, 0)} article{commande.items.length > 1 ? 's' : ''}
                    </p>
                    <p className="text-sm font-medium text-gray-600">
                      {commande.items.length} fromage{commande.items.length > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {/* Total */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="p-2 bg-orange-100 rounded-lg border border-orange-200">
                      <Euro className="h-4 w-4 text-orange-600" />
                    </div>
                    <h4 className="font-bold text-sm text-gray-700">Total</h4>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                    <p className="font-bold text-2xl text-orange-600">
                      {commande.total.toFixed(2)}€
                    </p>
                    <p className="text-sm font-medium text-gray-600">
                      {format(commande.dateCreation, 'dd/MM/yyyy HH:mm')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions simplifiées */}
              <div className="flex items-center space-x-3 mt-6 pt-4 border-t-2 border-gray-200">
                <button
                  onClick={() => onViewDetails(commande)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg shadow-sm transition-colors"
                >
                  <Eye className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-700 font-medium">Voir détails</span>
                </button>

                {commande.statut === StatutCommande.EN_ATTENTE && (
                  <button
                    onClick={() => onStatusChange(commande.id, StatutCommande.PREPAREE)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 border border-blue-300 rounded-lg shadow-sm transition-colors"
                  >
                    <Package className="h-4 w-4 text-blue-600" />
                    <span className="text-blue-700 font-medium">Marquer préparée</span>
                  </button>
                )}

                {commande.statut === StatutCommande.PREPAREE && (
                  <button
                    onClick={() => onStatusChange(commande.id, StatutCommande.RETIREE)}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-100 hover:bg-green-200 border border-green-300 rounded-lg shadow-sm transition-colors"
                  >
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-700 font-medium">Marquer retirée</span>
                  </button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCommandes.length === 0 && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto p-8 bg-white rounded-lg border-2 border-gray-200 shadow-lg">
            <div className="w-16 h-16 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center border border-orange-200">
              <ShoppingBag className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-gray-700 font-bold text-lg">
              Aucune commande ne correspond aux critères sélectionnés.
            </p>
          </div>
        </div>
      )}
    </div>
  )
} 