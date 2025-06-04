'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Fromage, TypeFromage, TypeLait, TYPE_FROMAGE_LABELS, TYPE_LAIT_LABELS } from '@/types'
import { X, Save } from 'lucide-react'

interface FromageFormProps {
  fromage?: Fromage | null
  onSubmit: (fromageData: Partial<Fromage>) => void
  onCancel: () => void
}

export function FromageForm({ fromage, onSubmit, onCancel }: FromageFormProps) {
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    prix: 0,
    poids: 0,
    type: '' as TypeFromage,
    lait: '' as TypeLait,
    image: '',
    disponible: true,
    stock: 0
  })

  useEffect(() => {
    if (fromage) {
      setFormData({
        nom: fromage.nom,
        description: fromage.description,
        prix: fromage.prix,
        poids: fromage.poids,
        type: fromage.type,
        lait: fromage.lait,
        image: fromage.image,
        disponible: fromage.disponible,
        stock: fromage.stock || 0
      })
    }
  }, [fromage])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-bold">
            {fromage ? 'Modifier le fromage' : 'Ajouter un fromage'}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom du fromage *</Label>
                <Input
                  id="nom"
                  value={formData.nom}
                  onChange={(e) => handleChange('nom', e.target.value)}
                  placeholder="Ex: Camembert de Normandie"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prix">Prix (€) *</Label>
                <Input
                  id="prix"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.prix}
                  onChange={(e) => handleChange('prix', parseFloat(e.target.value) || 0)}
                  placeholder="Ex: 12.50"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="poids">Poids (g) *</Label>
                <Input
                  id="poids"
                  type="number"
                  min="1"
                  value={formData.poids}
                  onChange={(e) => handleChange('poids', parseInt(e.target.value) || 0)}
                  placeholder="Ex: 250"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => handleChange('stock', parseInt(e.target.value) || 0)}
                  placeholder="Ex: 10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type de fromage *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleChange('type', value as TypeFromage)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(TYPE_FROMAGE_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lait">Type de lait *</Label>
                <Select
                  value={formData.lait}
                  onValueChange={(value) => handleChange('lait', value as TypeLait)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un lait" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(TYPE_LAIT_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">URL de l&apos;image *</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => handleChange('image', e.target.value)}
                placeholder="Ex: /images/fromages/camembert.jpg"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Décrivez le fromage, son goût, sa texture..."
                rows={4}
                required
              />
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="disponible"
                  checked={formData.disponible}
                  onChange={(e) => handleChange('disponible', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="disponible">Disponible à la vente</Label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                {fromage ? 'Modifier' : 'Ajouter'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 