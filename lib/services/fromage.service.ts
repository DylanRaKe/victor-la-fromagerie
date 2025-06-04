import { prisma } from '@/lib/db'
import { Fromage, TypeFromage, TypeLait } from '@/types'

export interface CreateFromageData {
  nom: string
  description: string
  prix: number
  poids: number
  type: TypeFromage
  lait: TypeLait
  image: string
  disponible?: boolean
  stock?: number
}

export type UpdateFromageData = Partial<CreateFromageData>

export class FromageService {
  static async getAll(): Promise<Fromage[]> {
    const fromages = await prisma.fromage.findMany({
      orderBy: { nom: 'asc' }
    })
    
    return fromages.map(f => ({
      ...f,
      type: f.type as TypeFromage,
      lait: f.lait as TypeLait,
      stock: f.stock ?? undefined
    }))
  }

  static async getById(id: string): Promise<Fromage | null> {
    const fromage = await prisma.fromage.findUnique({
      where: { id }
    })
    
    if (!fromage) return null
    
    return {
      ...fromage,
      type: fromage.type as TypeFromage,
      lait: fromage.lait as TypeLait,
      stock: fromage.stock ?? undefined
    }
  }

  static async getAvailable(): Promise<Fromage[]> {
    const fromages = await prisma.fromage.findMany({
      where: { disponible: true },
      orderBy: { nom: 'asc' }
    })
    
    return fromages.map(f => ({
      ...f,
      type: f.type as TypeFromage,
      lait: f.lait as TypeLait,
      stock: f.stock ?? undefined
    }))
  }

  static async getFeatured(): Promise<Fromage[]> {
    // Retourne les 3 premiers fromages disponibles
    const fromages = await prisma.fromage.findMany({
      where: { disponible: true },
      orderBy: { nom: 'asc' },
      take: 3
    })
    
    return fromages.map(f => ({
      ...f,
      type: f.type as TypeFromage,
      lait: f.lait as TypeLait,
      stock: f.stock ?? undefined
    }))
  }

  static async create(data: CreateFromageData): Promise<Fromage> {
    const fromage = await prisma.fromage.create({
      data: {
        nom: data.nom,
        description: data.description,
        prix: data.prix,
        poids: data.poids,
        type: data.type,
        lait: data.lait,
        image: data.image,
        disponible: data.disponible ?? true,
        stock: data.stock
      }
    })
    
    return {
      ...fromage,
      type: fromage.type as TypeFromage,
      lait: fromage.lait as TypeLait,
      stock: fromage.stock ?? undefined
    }
  }

  static async update(id: string, data: UpdateFromageData): Promise<Fromage | null> {
    try {
      const fromage = await prisma.fromage.update({
        where: { id },
        data: {
          ...(data.nom && { nom: data.nom }),
          ...(data.description && { description: data.description }),
          ...(data.prix !== undefined && { prix: data.prix }),
          ...(data.poids !== undefined && { poids: data.poids }),
          ...(data.type && { type: data.type }),
          ...(data.lait && { lait: data.lait }),
          ...(data.image && { image: data.image }),
          ...(data.disponible !== undefined && { disponible: data.disponible }),
          ...(data.stock !== undefined && { stock: data.stock })
        }
      })
      
      return {
        ...fromage,
        type: fromage.type as TypeFromage,
        lait: fromage.lait as TypeLait,
        stock: fromage.stock ?? undefined
      }
    } catch {
      return null
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      await prisma.fromage.delete({
        where: { id }
      })
      return true
    } catch {
      return false
    }
  }

  static async updateStock(id: string, newStock: number): Promise<boolean> {
    try {
      await prisma.fromage.update({
        where: { id },
        data: { 
          stock: newStock,
          disponible: newStock > 0
        }
      })
      return true
    } catch {
      return false
    }
  }
} 