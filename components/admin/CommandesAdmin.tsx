'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Commande } from '@/types'
import { Package, Search, Eye, Clock, CheckCircle, XCircle } from 'lucide-react'

interface CommandesAdminProps {
  commandes: Commande[]
  onCommandesChange: (commandes: Commande[]) => void
}

const STATUT_LABELS = {
  'en_attente': 'En attente',
  'preparee': 'Préparée',
  'retiree': 'Retirée',
  'annulee': 'Annulée'
}

const STATUT_COLORS = {
  'en_attente': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'preparee': 'bg-blue-100 text-blue-800 border-blue-200',
  'retiree': 'bg-green-100 text-green-800 border-green-200',
  'annulee': 'bg-red-100 text-red-800 border-red-200'
}

export function CommandesAdmin({ commandes, onCommandesChange }: CommandesAdminProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedCommande, setSelectedCommande] = useState<Commande | null>(null)

  const filteredCommandes = commandes.filter(commande => {
    const matchesSearch = 
      commande.client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      commande.client.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      commande.client.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || commande.statut === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const handleStatusChange = async (commandeId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/commandes/${commandeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ statut: newStatus })
      })

      if (response.ok) {
        const updatedCommande = await response.json()
        onCommandesChange(commandes.map(c => 
          c.id === commandeId ? updatedCommande : c
        ))
      }
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return dateObj.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header avec recherche et filtres */}
      <Card className="bg-white border-2 border-blue-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3 text-gray-800">
            <Package className="h-6 w-6 text-blue-600" />
            <span>Gestion des Commandes ({commandes.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher par nom, prénom ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                {Object.entries(STATUT_LABELS).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Liste des commandes */}
      <div className="space-y-4">
        {filteredCommandes.map((commande) => (
          <Card key={commande.id} className="bg-white border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">
                      {commande.client.prenom} {commande.client.nom}
                    </h3>
                    <p className="text-sm text-gray-600">{commande.client.email}</p>
                    <p className="text-sm text-gray-500">
                      Commande #{commande.id.slice(-8)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge className={STATUT_COLORS[commande.statut as keyof typeof STATUT_COLORS]}>
                    {STATUT_LABELS[commande.statut as keyof typeof STATUT_LABELS]}
                  </Badge>
                  <span className="text-lg font-bold text-blue-600">
                    {commande.total.toFixed(2)}€
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">
                    <strong>Téléphone:</strong> {commande.client.telephone || 'Non renseigné'}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Créée le:</strong> {formatDate(commande.dateCreation)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    <strong>Retrait prévu:</strong> {formatDate(commande.creneauRetrait.date)}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Créneau:</strong> {commande.creneauRetrait.heureDebut} - {commande.creneauRetrait.heureFin}
                  </p>
                </div>
              </div>

              {/* Articles de la commande */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Articles commandés:</h4>
                <div className="space-y-2">
                  {commande.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                      <span className="text-sm">
                        {item.quantite}x {item.fromage.nom}
                      </span>
                      <span className="text-sm font-medium">
                        {(item.quantite * item.prixUnitaire).toFixed(2)}€
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedCommande(commande)}
                  className="flex items-center space-x-1"
                >
                  <Eye className="h-4 w-4" />
                  <span>Détails</span>
                </Button>

                {commande.statut === 'en_attente' && (
                  <Button
                    size="sm"
                    onClick={() => handleStatusChange(commande.id, 'preparee')}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Clock className="h-4 w-4 mr-1" />
                    Marquer préparée
                  </Button>
                )}

                {commande.statut === 'preparee' && (
                  <Button
                    size="sm"
                    onClick={() => handleStatusChange(commande.id, 'retiree')}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Marquer retirée
                  </Button>
                )}

                {(commande.statut === 'en_attente' || commande.statut === 'preparee') && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStatusChange(commande.id, 'annulee')}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Annuler
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCommandes.length === 0 && (
        <Card className="bg-white border-2 border-gray-200 shadow-lg">
          <CardContent className="p-12 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Aucune commande trouvée
            </h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'Aucune commande ne correspond à vos critères de recherche.' 
                : 'Aucune commande n\'a encore été passée.'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Modal de détails (optionnel) */}
      {selectedCommande && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle>Détails de la commande #{selectedCommande.id.slice(-8)}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCommande(null)}
                className="h-8 w-8 p-0"
              >
                ×
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Informations client</h4>
                  <div className="bg-gray-50 p-4 rounded">
                    <p><strong>Nom:</strong> {selectedCommande.client.prenom} {selectedCommande.client.nom}</p>
                    <p><strong>Email:</strong> {selectedCommande.client.email}</p>
                    <p><strong>Téléphone:</strong> {selectedCommande.client.telephone || 'Non renseigné'}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Créneau de retrait</h4>
                  <div className="bg-gray-50 p-4 rounded">
                    <p><strong>Date:</strong> {formatDate(selectedCommande.creneauRetrait.date)}</p>
                    <p><strong>Horaire:</strong> {selectedCommande.creneauRetrait.heureDebut} - {selectedCommande.creneauRetrait.heureFin}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Articles commandés</h4>
                  <div className="space-y-2">
                    {selectedCommande.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                        <div>
                          <p className="font-medium">{item.fromage.nom}</p>
                          <p className="text-sm text-gray-600">
                            {item.quantite} × {item.prixUnitaire.toFixed(2)}€
                          </p>
                        </div>
                        <span className="font-bold">
                          {(item.quantite * item.prixUnitaire).toFixed(2)}€
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between items-center font-bold text-lg">
                      <span>Total:</span>
                      <span>{selectedCommande.total.toFixed(2)}€</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
} 