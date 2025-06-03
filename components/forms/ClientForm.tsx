'use client'

import { useState } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { InfoClient } from '@/types'
import { User, Mail, Phone } from 'lucide-react'

interface ClientFormProps {
  clientInfo: InfoClient | null
  onClientInfoChange: (info: InfoClient) => void
}

export function ClientForm({ clientInfo, onClientInfoChange }: ClientFormProps) {
  const [errors, setErrors] = useState<Partial<InfoClient>>({})

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }



  const handleInputChange = (field: keyof InfoClient, value: string) => {
    const updatedInfo = {
      ...clientInfo,
      [field]: value
    } as InfoClient

    // Validation en temps réel pour ce champ
    const fieldErrors = { ...errors }
    delete fieldErrors[field]

    if (field === 'email' && value && !validateEmail(value)) {
      fieldErrors.email = 'Format d\'email invalide'
    }

    setErrors(fieldErrors)
    onClientInfoChange(updatedInfo)
  }



  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span>Vos coordonnées</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nom */}
          <div className="space-y-2">
            <Label htmlFor="nom">Nom *</Label>
            <Input
              id="nom"
              type="text"
              placeholder="Votre nom"
              value={clientInfo?.nom || ''}
              onChange={(e) => handleInputChange('nom', e.target.value)}
              className={errors.nom ? 'border-destructive' : ''}
            />
            {errors.nom && (
              <p className="text-sm text-destructive">{errors.nom}</p>
            )}
          </div>

          {/* Prénom */}
          <div className="space-y-2">
            <Label htmlFor="prenom">Prénom *</Label>
            <Input
              id="prenom"
              type="text"
              placeholder="Votre prénom"
              value={clientInfo?.prenom || ''}
              onChange={(e) => handleInputChange('prenom', e.target.value)}
              className={errors.prenom ? 'border-destructive' : ''}
            />
            {errors.prenom && (
              <p className="text-sm text-destructive">{errors.prenom}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center space-x-2">
            <Mail className="h-4 w-4" />
            <span>Email *</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="votre.email@exemple.com"
            value={clientInfo?.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={errors.email ? 'border-destructive' : ''}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
          <p className="text-sm text-muted-foreground">
            Vous recevrez la confirmation de commande à cette adresse
          </p>
        </div>

        {/* Téléphone (optionnel) */}
        <div className="space-y-2">
          <Label htmlFor="telephone" className="flex items-center space-x-2">
            <Phone className="h-4 w-4" />
            <span>Téléphone (optionnel)</span>
          </Label>
          <Input
            id="telephone"
            type="tel"
            placeholder="06 12 34 56 78"
            value={clientInfo?.telephone || ''}
            onChange={(e) => handleInputChange('telephone', e.target.value)}
            className={errors.telephone ? 'border-destructive' : ''}
          />
          {errors.telephone && (
            <p className="text-sm text-destructive">{errors.telephone}</p>
          )}
          <p className="text-sm text-muted-foreground">
            Pour vous contacter en cas de besoin
          </p>
        </div>

        {/* Informations légales */}
        <div className="text-sm text-muted-foreground space-y-1 pt-4 border-t">
          <p>* Champs obligatoires</p>
          <p>
            En validant votre commande, vous acceptez nos{' '}
            <a href="/legal/mentions" className="text-primary hover:underline">
              conditions générales
            </a>{' '}
            et notre{' '}
            <a href="/legal/rgpd" className="text-primary hover:underline">
              politique de confidentialité
            </a>.
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 