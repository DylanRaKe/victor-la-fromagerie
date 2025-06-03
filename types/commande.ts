import { Fromage } from './fromage'

export enum StatutCommande {
  EN_ATTENTE = 'en_attente',
  PREPAREE = 'preparee',
  RETIREE = 'retiree',
  ANNULEE = 'annulee'
}

export interface InfoClient {
  nom: string
  prenom: string
  email: string
  telephone?: string
}

export interface CreneauRetrait {
  date: Date
  heureDebut: string
  heureFin: string
}

export interface ItemCommande {
  fromage: Fromage
  quantite: number
  prixUnitaire: number
}

export interface Commande {
  id: string
  items: ItemCommande[]
  client: InfoClient
  creneauRetrait: CreneauRetrait
  statut: StatutCommande
  dateCreation: Date
  total: number
}

export const STATUT_COMMANDE_LABELS: Record<StatutCommande, string> = {
  [StatutCommande.EN_ATTENTE]: 'En attente',
  [StatutCommande.PREPAREE]: 'Préparée',
  [StatutCommande.RETIREE]: 'Retirée',
  [StatutCommande.ANNULEE]: 'Annulée'
}

// Créneaux disponibles par défaut
export const CRENEAUX_DISPONIBLES = [
  { heureDebut: '09:00', heureFin: '10:00' },
  { heureDebut: '10:00', heureFin: '11:00' },
  { heureDebut: '11:00', heureFin: '12:00' },
  { heureDebut: '14:00', heureFin: '15:00' },
  { heureDebut: '15:00', heureFin: '16:00' },
  { heureDebut: '16:00', heureFin: '17:00' },
  { heureDebut: '17:00', heureFin: '18:00' }
] 