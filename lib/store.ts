import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Fromage, ItemCommande } from '@/types'

interface PanierStore {
  items: ItemCommande[]
  ajouterAuPanier: (fromage: Fromage, quantite: number) => void
  retirerDuPanier: (fromageId: string) => void
  modifierQuantite: (fromageId: string, quantite: number) => void
  viderPanier: () => void
  calculerTotal: () => number
  getNombreItems: () => number
}

export const usePanierStore = create<PanierStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      ajouterAuPanier: (fromage: Fromage, quantite: number) => {
        set((state) => {
          const existingItem = state.items.find(item => item.fromage.id === fromage.id)
          
          if (existingItem) {
            // Si le fromage existe déjà, on augmente la quantité
            return {
              items: state.items.map(item =>
                item.fromage.id === fromage.id
                  ? { ...item, quantite: item.quantite + quantite }
                  : item
              )
            }
          } else {
            // Sinon on ajoute un nouvel item
            return {
              items: [...state.items, {
                fromage,
                quantite,
                prixUnitaire: fromage.prix
              }]
            }
          }
        })
      },
      
      retirerDuPanier: (fromageId: string) => {
        set((state) => ({
          items: state.items.filter(item => item.fromage.id !== fromageId)
        }))
      },
      
      modifierQuantite: (fromageId: string, quantite: number) => {
        if (quantite <= 0) {
          get().retirerDuPanier(fromageId)
          return
        }
        
        set((state) => ({
          items: state.items.map(item =>
            item.fromage.id === fromageId
              ? { ...item, quantite }
              : item
          )
        }))
      },
      
      viderPanier: () => {
        set({ items: [] })
      },
      
      calculerTotal: () => {
        return get().items.reduce((total, item) => {
          return total + (item.prixUnitaire * item.quantite)
        }, 0)
      },
      
      getNombreItems: () => {
        return get().items.reduce((total, item) => total + item.quantite, 0)
      }
    }),
    {
      name: 'victor-panier-storage',
    }
  )
) 