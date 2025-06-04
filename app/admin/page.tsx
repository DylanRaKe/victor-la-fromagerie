'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CommandesAdmin } from '@/components/admin/CommandesAdmin'
import { FromagesAdmin } from '@/components/admin/FromagesAdmin'
import { Fromage, Commande } from '@/types'
import { Settings, Package, Users, Crown, TrendingUp, Clock, Cookie } from 'lucide-react'

export default function AdminPage() {
  const [fromages, setFromages] = useState<Fromage[]>([])
  const [commandes, setCommandes] = useState<Commande[]>([])
  const [loading, setLoading] = useState(true)

  // Charger les données depuis l'API
  useEffect(() => {
    const loadData = async () => {
      try {
        const [fromagesRes, commandesRes] = await Promise.all([
          fetch('/api/fromages'),
          fetch('/api/commandes')
        ])

        const fromagesData = await fromagesRes.json()
        const commandesData = await commandesRes.json()

        setFromages(fromagesData)
        setCommandes(commandesData)
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Statistiques
  const stats = {
    totalFromages: fromages.length,
    fromagesDisponibles: fromages.filter(f => f.disponible).length,
    totalCommandes: commandes.length,
    commandesEnAttente: commandes.filter(c => c.statut === 'en_attente').length,
    chiffreAffaires: commandes
      .filter(c => c.statut === 'retiree')
      .reduce((total, c) => total + c.total, 0)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de l&apos;administration...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between bg-white rounded-lg border-2 border-orange-200 shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-100 rounded-lg border border-orange-300">
                <Crown className="h-8 w-8 text-orange-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Administration</h1>
                <p className="text-gray-600 font-medium">Gestion Victor la Fromagerie</p>
              </div>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg shadow-sm transition-colors">
              <Settings className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Paramètres</span>
            </button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="bg-white border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-gray-700">Fromages</CardTitle>
                <div className="p-2 bg-yellow-100 rounded-lg border border-yellow-200">
                  <Cookie className="h-4 w-4 text-yellow-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-800">{stats.totalFromages}</div>
              <div className="text-sm text-gray-600">{stats.fromagesDisponibles} disponibles</div>
            </CardContent>
          </Card>

          <Card className="bg-white border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-gray-700">Commandes</CardTitle>
                <div className="p-2 bg-blue-100 rounded-lg border border-blue-200">
                  <Package className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-800">{stats.totalCommandes}</div>
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
              <div className="text-3xl font-bold text-yellow-600">{stats.commandesEnAttente}</div>
            </CardContent>
          </Card>

          <Card className="bg-white border-2 border-green-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-gray-700">Clients</CardTitle>
                <div className="p-2 bg-green-100 rounded-lg border border-green-200">
                  <Users className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {new Set(commandes.map(c => c.client.email)).size}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-2 border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-gray-700">CA Total</CardTitle>
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

        {/* Onglets de gestion */}
        <Tabs defaultValue="fromages" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white border-2 border-gray-200 shadow-lg">
            <TabsTrigger 
              value="fromages" 
              className="flex items-center space-x-2 data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800 data-[state=active]:border-orange-300"
            >
              <Cookie className="h-4 w-4" />
              <span>Gestion des Fromages</span>
            </TabsTrigger>
            <TabsTrigger 
              value="commandes"
              className="flex items-center space-x-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800 data-[state=active]:border-blue-300"
            >
              <Package className="h-4 w-4" />
              <span>Gestion des Commandes</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fromages">
            <FromagesAdmin 
              fromages={fromages} 
              onFromagesChange={setFromages}
            />
          </TabsContent>

          <TabsContent value="commandes">
            <CommandesAdmin 
              commandes={commandes} 
              onCommandesChange={setCommandes}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 