export enum TypeFromage {
  PATE_MOLLE = 'pate_molle',
  PATE_DURE = 'pate_dure',
  CHEVRE = 'chevre',
  BLEU = 'bleu'
}

export enum TypeLait {
  VACHE = 'vache',
  CHEVRE = 'chevre',
  BREBIS = 'brebis'
}

export interface Fromage {
  id: string
  nom: string
  description: string
  prix: number
  poids: number
  type: TypeFromage
  lait: TypeLait
  image: string
  disponible: boolean
  stock?: number
}

export const TYPE_FROMAGE_LABELS: Record<TypeFromage, string> = {
  [TypeFromage.PATE_MOLLE]: 'Pâte molle',
  [TypeFromage.PATE_DURE]: 'Pâte dure',
  [TypeFromage.CHEVRE]: 'Chèvre',
  [TypeFromage.BLEU]: 'Bleu'
}

export const TYPE_LAIT_LABELS: Record<TypeLait, string> = {
  [TypeLait.VACHE]: 'Lait de vache',
  [TypeLait.CHEVRE]: 'Lait de chèvre',
  [TypeLait.BREBIS]: 'Lait de brebis'
} 