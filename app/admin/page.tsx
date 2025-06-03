'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CommandesList } from '@/components/admin/CommandesList'
import { CommandeDetails } from '@/components/admin/CommandeDetails'
import { commandesData } from '@/data/commandes'
import { Commande, StatutCommande, STATUT_COMMANDE_LABELS } from '@/types'
import { Settings, Package, Users, Crown, TrendingUp, Clock, CheckCircle } from 'lucide-react'

export default function AdminPage() {
  const [commandes, setCommandes] = useState<Commande[]>(commandesData)
  const [selectedCommande, setSelectedCommande] = useState<Commande | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const handleStatusChange = (commandeId: string, newStatus: StatutCommande) => {
    setCommandes(prev => 
      prev.map(commande => 
        commande.id === commandeId 
          ? { ...commande, statut: newStatus }
          : commande
      )
    )
  }

  const handleViewDetails = (commande: Commande) => {
    setSelectedCommande(commande)
    setIsDetailsOpen(true)
  }

  const handleCloseDetails = () => {
    setIsDetailsOpen(false)
    setSelectedCommande(null)
  }

  // Statistiques
  const stats = {
    total: commandes.length,
    enAttente: commandes.filter(c => c.statut === StatutCommande.EN_ATTENTE).length,
    preparees: commandes.filter(c => c.statut === StatutCommande.PREPAREE).length,
    retirees: commandes.filter(c => c.statut === StatutCommande.RETIREE).length,
    chiffreAffaires: commandes
      .filter(c => c.statut === StatutCommande.RETIREE)
      .reduce((total, c) => total + c.total, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header simplifié */}
        <div className="mb-8">
          <div className="flex items-center justify-between bg-white rounded-lg border-2 border-orange-200 shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-100 rounded-lg border border-orange-300">
                <Crown className="h-8 w-8 text-orange-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Administration</h1>
                <p className="text-gray-600 font-medium">Gestion des commandes Victor la Fromagerie</p>
              </div>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg shadow-sm transition-colors">
              <Settings className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Paramètres</span>
            </button>
          </div>
        </div>

        {/* Statistiques simplifiées */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="bg-white border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-gray-700">Total commandes</CardTitle>
                <div className="p-2 bg-blue-100 rounded-lg border border-blue-200">
                  <Package className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-800">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="bg-white border-2 border-yellow-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-gray-700">En attente</CardTitle>
                <div className="p-2 bg-yellow-100 rounded-lg border border-yellow-200">
                  <Clock className="h-4 w-4 text-yellow-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{stats.enAttente}</div>
            </CardContent>
          </Card>

          <Card className="bg-white border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-gray-700">Préparées</CardTitle>
                <div className="p-2 bg-blue-100 rounded-lg border border-blue-200">
                  <Package className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{stats.preparees}</div>
            </CardContent>
          </Card>

          <Card className="bg-white border-2 border-green-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-gray-700">Retirées</CardTitle>
                <div className="p-2 bg-green-100 rounded-lg border border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.retirees}</div>
            </CardContent>
          </Card>

          <Card className="bg-white border-2 border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-gray-700">Chiffre d&apos;affaires</CardTitle>
                <div className="p-2 bg-orange-100 rounded-lg border border-orange-200">
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">
                {stats.chiffreAffaires.toFixed(2)}€
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Répartition par statut simplifiée */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(STATUT_COMMANDE_LABELS).map(([statut, label]) => {
            const count = commandes.filter(c => c.statut === statut).length
            const percentage = stats.total > 0 ? (count / stats.total * 100).toFixed(1) : '0'
            
            const colors = {
              [StatutCommande.EN_ATTENTE]: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700' },
              [StatutCommande.PREPAREE]: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
              [StatutCommande.RETIREE]: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' },
              [StatutCommande.ANNULEE]: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700' }
            }
            
            const color = colors[statut as StatutCommande] || colors[StatutCommande.EN_ATTENTE]
            
            return (
              <Card key={statut} className={`${color.bg} border-2 ${color.border} shadow-lg hover:shadow-xl transition-shadow`}>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className={`text-4xl font-bold mb-2 ${color.text}`}>{count}</div>
                    <div className={`text-sm font-bold mb-1 ${color.text}`}>{label}</div>
                    <div className={`text-xs font-medium ${color.text}`}>{percentage}%</div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Liste des commandes simplifiée */}
        <Card className="bg-white border-2 border-gray-200 shadow-lg">
          <CardHeader className="bg-orange-50 border-b-2 border-orange-200">
            <CardTitle className="flex items-center space-x-3 text-gray-800 text-xl">
              <div className="p-2 bg-orange-100 rounded-lg border border-orange-200">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <span>Gestion des Commandes</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <CommandesList
              commandes={commandes}
              onStatusChange={handleStatusChange}
              onViewDetails={handleViewDetails}
            />
          </CardContent>
        </Card>

        {/* Modal de détails */}
        <CommandeDetails
          commande={selectedCommande}
          isOpen={isDetailsOpen}
          onClose={handleCloseDetails}
        />
      </div>
    </div>
  )
} 