import { Commande, StatutCommande } from '@/types'
import { fromagesData } from './fromages'

export const commandesData: Commande[] = [
  {
    id: 'CMD-001',
    items: [
      {
        fromage: fromagesData[0], // Camembert
        quantite: 2,
        prixUnitaire: 8.50
      },
      {
        fromage: fromagesData[2], // Comté
        quantite: 1,
        prixUnitaire: 12.80
      }
    ],
    client: {
      nom: 'Dupont',
      prenom: 'Marie',
      email: 'marie.dupont@email.com',
      telephone: '06 12 34 56 78'
    },
    creneauRetrait: {
      date: new Date('2024-01-15T10:00:00'),
      heureDebut: '10:00',
      heureFin: '11:00'
    },
    statut: StatutCommande.EN_ATTENTE,
    dateCreation: new Date('2024-01-14T14:30:00'),
    total: 29.80
  },
  {
    id: 'CMD-002',
    items: [
      {
        fromage: fromagesData[1], // Roquefort
        quantite: 1,
        prixUnitaire: 15.90
      }
    ],
    client: {
      nom: 'Martin',
      prenom: 'Pierre',
      email: 'pierre.martin@email.com'
    },
    creneauRetrait: {
      date: new Date('2024-01-15T14:00:00'),
      heureDebut: '14:00',
      heureFin: '15:00'
    },
    statut: StatutCommande.PREPAREE,
    dateCreation: new Date('2024-01-14T16:45:00'),
    total: 15.90
  },
  {
    id: 'CMD-003',
    items: [
      {
        fromage: fromagesData[3], // Crottin
        quantite: 3,
        prixUnitaire: 4.20
      },
      {
        fromage: fromagesData[6], // Chèvre herbes
        quantite: 2,
        prixUnitaire: 6.80
      }
    ],
    client: {
      nom: 'Bernard',
      prenom: 'Sophie',
      email: 'sophie.bernard@email.com',
      telephone: '01 23 45 67 89'
    },
    creneauRetrait: {
      date: new Date('2024-01-14T16:00:00'),
      heureDebut: '16:00',
      heureFin: '17:00'
    },
    statut: StatutCommande.RETIREE,
    dateCreation: new Date('2024-01-13T11:20:00'),
    total: 26.20
  },
  {
    id: 'CMD-004',
    items: [
      {
        fromage: fromagesData[4], // Brie
        quantite: 1,
        prixUnitaire: 11.50
      },
      {
        fromage: fromagesData[5], // Bleu d'Auvergne
        quantite: 1,
        prixUnitaire: 9.90
      }
    ],
    client: {
      nom: 'Leroy',
      prenom: 'Jean',
      email: 'jean.leroy@email.com'
    },
    creneauRetrait: {
      date: new Date('2024-01-16T09:00:00'),
      heureDebut: '09:00',
      heureFin: '10:00'
    },
    statut: StatutCommande.EN_ATTENTE,
    dateCreation: new Date('2024-01-15T09:15:00'),
    total: 21.40
  },
  {
    id: 'CMD-005',
    items: [
      {
        fromage: fromagesData[8], // Ossau-Iraty
        quantite: 1,
        prixUnitaire: 13.50
      }
    ],
    client: {
      nom: 'Moreau',
      prenom: 'Claire',
      email: 'claire.moreau@email.com',
      telephone: '06 98 76 54 32'
    },
    creneauRetrait: {
      date: new Date('2024-01-16T15:00:00'),
      heureDebut: '15:00',
      heureFin: '16:00'
    },
    statut: StatutCommande.PREPAREE,
    dateCreation: new Date('2024-01-15T13:45:00'),
    total: 13.50
  }
] 