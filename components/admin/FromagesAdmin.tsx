'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { FromageForm } from '@/components/admin/FromageForm'
import { Fromage, TYPE_FROMAGE_LABELS, TYPE_LAIT_LABELS } from '@/types'
import { Plus, Edit, Trash2, Package, Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'

interface FromagesAdminProps {
  fromages: Fromage[]
  onFromagesChange: (fromages: Fromage[]) => void
}

export function FromagesAdmin({ fromages, onFromagesChange }: FromagesAdminProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingFromage, setEditingFromage] = useState<Fromage | null>(null)

  const filteredFromages = fromages.filter(fromage =>
    fromage.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fromage.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddFromage = () => {
    setEditingFromage(null)
    setShowForm(true)
  }

  const handleEditFromage = (fromage: Fromage) => {
    setEditingFromage(fromage)
    setShowForm(true)
  }

  const handleDeleteFromage = async (fromageId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce fromage ?')) return

    try {
      const response = await fetch(`/api/fromages/${fromageId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        onFromagesChange(fromages.filter(f => f.id !== fromageId))
      } else {
        alert('Erreur lors de la suppression')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la suppression')
    }
  }

  const handleToggleDisponibilite = async (fromage: Fromage) => {
    try {
      const response = await fetch(`/api/fromages/${fromage.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...fromage,
          disponible: !fromage.disponible
        })
      })

      if (response.ok) {
        const updatedFromage = await response.json()
        onFromagesChange(fromages.map(f => 
          f.id === fromage.id ? updatedFromage : f
        ))
      }
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  const handleFormSubmit = async (fromageData: Partial<Fromage>) => {
    try {
      const url = editingFromage 
        ? `/api/fromages/${editingFromage.id}`
        : '/api/fromages'
      
      const method = editingFromage ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fromageData)
      })

      if (response.ok) {
        const savedFromage = await response.json()
        
        if (editingFromage) {
          onFromagesChange(fromages.map(f => 
            f.id === editingFromage.id ? savedFromage : f
          ))
        } else {
          onFromagesChange([...fromages, savedFromage])
        }
        
        setShowForm(false)
        setEditingFromage(null)
      } else {
        alert('Erreur lors de la sauvegarde')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la sauvegarde')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header avec recherche et bouton d'ajout */}
      <Card className="bg-white border-2 border-orange-200 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-3 text-gray-800">
              <Package className="h-6 w-6 text-orange-600" />
              <span>Gestion des Fromages ({fromages.length})</span>
            </CardTitle>
            <Button 
              onClick={handleAddFromage}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un fromage
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Rechercher un fromage..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </CardContent>
      </Card>

      {/* Liste des fromages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFromages.map((fromage) => (
          <Card key={fromage.id} className="bg-white border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="relative mb-4">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={fromage.image}
                    alt={fromage.nom}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-2 right-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleToggleDisponibilite(fromage)}
                    className={fromage.disponible ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}
                  >
                    {fromage.disponible ? (
                      <Eye className="h-4 w-4 text-green-600" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-red-600" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{fromage.nom}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{fromage.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    {TYPE_FROMAGE_LABELS[fromage.type]}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {TYPE_LAIT_LABELS[fromage.lait]}
                  </Badge>
                  <Badge 
                    variant={fromage.disponible ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {fromage.disponible ? 'Disponible' : 'Indisponible'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-orange-600">
                      {fromage.prix.toFixed(2)}€
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      / {fromage.poids}g
                    </span>
                  </div>
                  {fromage.stock && (
                    <span className="text-sm text-gray-600">
                      Stock: {fromage.stock}
                    </span>
                  )}
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditFromage(fromage)}
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteFromage(fromage.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFromages.length === 0 && (
        <Card className="bg-white border-2 border-gray-200 shadow-lg">
          <CardContent className="p-12 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Aucun fromage trouvé
            </h3>
            <p className="text-gray-500">
              {searchTerm ? 'Aucun fromage ne correspond à votre recherche.' : 'Commencez par ajouter votre premier fromage.'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Modal de formulaire */}
      {showForm && (
        <FromageForm
          fromage={editingFromage}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false)
            setEditingFromage(null)
          }}
        />
      )}
    </div>
  )
} 