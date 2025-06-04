import { prisma } from '@/lib/db'
import { Commande, StatutCommande, InfoClient, CreneauRetrait, TypeFromage, TypeLait } from '@/types'
import { FromageService } from './fromage.service'

export interface CreateCommandeData {
  client: InfoClient
  creneauRetrait: CreneauRetrait
  items: Array<{
    fromageId: string
    quantite: number
    prixUnitaire: number
  }>
}

export class CommandeService {
  static async getAll(): Promise<Commande[]> {
    const commandes = await prisma.commande.findMany({
      include: {
        items: {
          include: {
            fromage: true
          }
        }
      },
      orderBy: { dateCreation: 'desc' }
    })
    
    return commandes.map(c => ({
      id: c.id,
      client: {
        nom: c.clientNom,
        prenom: c.clientPrenom,
        email: c.clientEmail,
        telephone: c.clientTelephone || undefined
      },
      creneauRetrait: {
        date: c.retraitDate,
        heureDebut: c.retraitHeureDebut,
        heureFin: c.retraitHeureFin
      },
      statut: c.statut as StatutCommande,
      dateCreation: c.dateCreation,
      total: c.total,
      items: c.items.map(item => ({
        fromage: {
          ...item.fromage,
          type: item.fromage.type as TypeFromage,
          lait: item.fromage.lait as TypeLait,
          stock: item.fromage.stock ?? undefined
        },
        quantite: item.quantite,
        prixUnitaire: item.prixUnitaire
      }))
    }))
  }

  static async getById(id: string): Promise<Commande | null> {
    const commande = await prisma.commande.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            fromage: true
          }
        }
      }
    })
    
    if (!commande) return null
    
    return {
      id: commande.id,
      client: {
        nom: commande.clientNom,
        prenom: commande.clientPrenom,
        email: commande.clientEmail,
        telephone: commande.clientTelephone || undefined
      },
      creneauRetrait: {
        date: commande.retraitDate,
        heureDebut: commande.retraitHeureDebut,
        heureFin: commande.retraitHeureFin
      },
      statut: commande.statut as StatutCommande,
      dateCreation: commande.dateCreation,
      total: commande.total,
      items: commande.items.map(item => ({
        fromage: {
          ...item.fromage,
          type: item.fromage.type as TypeFromage,
          lait: item.fromage.lait as TypeLait,
          stock: item.fromage.stock ?? undefined
        },
        quantite: item.quantite,
        prixUnitaire: item.prixUnitaire
      }))
    }
  }

  static async create(data: CreateCommandeData): Promise<Commande> {
    // Calculer le total
    const total = data.items.reduce((sum, item) => sum + (item.quantite * item.prixUnitaire), 0)
    
    const commande = await prisma.commande.create({
      data: {
        clientNom: data.client.nom,
        clientPrenom: data.client.prenom,
        clientEmail: data.client.email,
        clientTelephone: data.client.telephone,
        retraitDate: data.creneauRetrait.date,
        retraitHeureDebut: data.creneauRetrait.heureDebut,
        retraitHeureFin: data.creneauRetrait.heureFin,
        statut: StatutCommande.EN_ATTENTE,
        total,
        items: {
          create: data.items.map(item => ({
            fromageId: item.fromageId,
            quantite: item.quantite,
            prixUnitaire: item.prixUnitaire
          }))
        }
      },
      include: {
        items: {
          include: {
            fromage: true
          }
        }
      }
    })

    // Mettre à jour le stock des fromages
    for (const item of data.items) {
      const fromage = await FromageService.getById(item.fromageId)
      if (fromage && fromage.stock !== undefined) {
        await FromageService.updateStock(item.fromageId, fromage.stock - item.quantite)
      }
    }
    
    return {
      id: commande.id,
      client: {
        nom: commande.clientNom,
        prenom: commande.clientPrenom,
        email: commande.clientEmail,
        telephone: commande.clientTelephone || undefined
      },
      creneauRetrait: {
        date: commande.retraitDate,
        heureDebut: commande.retraitHeureDebut,
        heureFin: commande.retraitHeureFin
      },
      statut: commande.statut as StatutCommande,
      dateCreation: commande.dateCreation,
      total: commande.total,
      items: commande.items.map(item => ({
        fromage: {
          ...item.fromage,
          type: item.fromage.type as TypeFromage,
          lait: item.fromage.lait as TypeLait,
          stock: item.fromage.stock ?? undefined
        },
        quantite: item.quantite,
        prixUnitaire: item.prixUnitaire
      }))
    }
  }

  static async updateStatus(id: string, statut: StatutCommande): Promise<Commande | null> {
    try {
      const commande = await prisma.commande.update({
        where: { id },
        data: { statut },
        include: {
          items: {
            include: {
              fromage: true
            }
          }
        }
      })
      
      return {
        id: commande.id,
        client: {
          nom: commande.clientNom,
          prenom: commande.clientPrenom,
          email: commande.clientEmail,
          telephone: commande.clientTelephone || undefined
        },
        creneauRetrait: {
          date: commande.retraitDate,
          heureDebut: commande.retraitHeureDebut,
          heureFin: commande.retraitHeureFin
        },
        statut: commande.statut as StatutCommande,
        dateCreation: commande.dateCreation,
        total: commande.total,
        items: commande.items.map(item => ({
          fromage: {
            ...item.fromage,
            type: item.fromage.type as TypeFromage,
            lait: item.fromage.lait as TypeLait,
            stock: item.fromage.stock ?? undefined
          },
          quantite: item.quantite,
          prixUnitaire: item.prixUnitaire
        }))
      }
    } catch {
      return null
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      await prisma.commande.delete({
        where: { id }
      })
      return true
    } catch {
      return false
    }
  }

  static async getByStatus(statut: StatutCommande): Promise<Commande[]> {
    const commandes = await prisma.commande.findMany({
      where: { statut },
      include: {
        items: {
          include: {
            fromage: true
          }
        }
      },
      orderBy: { dateCreation: 'desc' }
    })
    
    return commandes.map(c => ({
      id: c.id,
      client: {
        nom: c.clientNom,
        prenom: c.clientPrenom,
        email: c.clientEmail,
        telephone: c.clientTelephone || undefined
      },
      creneauRetrait: {
        date: c.retraitDate,
        heureDebut: c.retraitHeureDebut,
        heureFin: c.retraitHeureFin
      },
      statut: c.statut as StatutCommande,
      dateCreation: c.dateCreation,
      total: c.total,
      items: c.items.map(item => ({
        fromage: {
          ...item.fromage,
          type: item.fromage.type as TypeFromage,
          lait: item.fromage.lait as TypeLait,
          stock: item.fromage.stock ?? undefined
        },
        quantite: item.quantite,
        prixUnitaire: item.prixUnitaire
      }))
    }))
  }
} 