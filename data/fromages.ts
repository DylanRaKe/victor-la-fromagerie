import { Fromage, TypeFromage, TypeLait } from '@/types'

export const fromagesData: Fromage[] = [
  {
    id: '1',
    nom: 'Camembert de Normandie',
    description: 'Un camembert authentique au lait cru, à la pâte crémeuse et au goût délicat. Affiné pendant 3 semaines pour développer sa croûte fleurie caractéristique.',
    prix: 8.50,
    poids: 250,
    type: TypeFromage.PATE_MOLLE,
    lait: TypeLait.VACHE,
    image: '/images/fromages/camembert.svg',
    disponible: true,
    stock: 12
  },
  {
    id: '2',
    nom: 'Roquefort AOP',
    description: 'Le roi des fromages bleus, fabriqué exclusivement avec du lait de brebis. Son goût puissant et sa texture crémeuse en font un incontournable.',
    prix: 15.90,
    poids: 200,
    type: TypeFromage.BLEU,
    lait: TypeLait.BREBIS,
    image: '/images/fromages/roquefort.svg',
    disponible: true,
    stock: 8
  },
  {
    id: '3',
    nom: 'Comté 18 mois',
    description: 'Un comté d\'exception, affiné 18 mois en cave. Notes fruitées et noisettées, texture fondante. Médaille d\'or au concours agricole.',
    prix: 12.80,
    poids: 300,
    type: TypeFromage.PATE_DURE,
    lait: TypeLait.VACHE,
    image: '/images/fromages/comte.svg',
    disponible: true,
    stock: 15
  },
  {
    id: '4',
    nom: 'Crottin de Chavignol',
    description: 'Petit fromage de chèvre à la pâte ferme et au goût prononcé. Parfait grillé sur une salade ou dégusté nature avec un vin blanc sec.',
    prix: 4.20,
    poids: 60,
    type: TypeFromage.CHEVRE,
    lait: TypeLait.CHEVRE,
    image: '/images/fromages/chevre.svg',
    disponible: true,
    stock: 20
  },
  {
    id: '5',
    nom: 'Brie de Meaux',
    description: 'Le roi des fromages selon Talleyrand. Pâte crémeuse et croûte fleurie, goût délicat avec des notes de champignon et de noisette.',
    prix: 11.50,
    poids: 400,
    type: TypeFromage.PATE_MOLLE,
    lait: TypeLait.VACHE,
    image: '/images/fromages/camembert.svg',
    disponible: true,
    stock: 6
  },
  {
    id: '6',
    nom: 'Bleu d\'Auvergne',
    description: 'Fromage bleu au lait de vache, plus doux que le Roquefort. Pâte crémeuse parsemée de veines bleues, goût équilibré entre douceur et caractère.',
    prix: 9.90,
    poids: 250,
    type: TypeFromage.BLEU,
    lait: TypeLait.VACHE,
    image: '/images/fromages/roquefort.svg',
    disponible: true,
    stock: 10
  },
  {
    id: '7',
    nom: 'Chèvre frais aux herbes',
    description: 'Fromage de chèvre frais agrémenté d\'un mélange d\'herbes de Provence. Texture crémeuse et goût frais, parfait pour l\'apéritif.',
    prix: 6.80,
    poids: 150,
    type: TypeFromage.CHEVRE,
    lait: TypeLait.CHEVRE,
    image: '/images/fromages/chevre.svg',
    disponible: true,
    stock: 14
  },
  {
    id: '8',
    nom: 'Reblochon de Savoie',
    description: 'Fromage emblématique de Savoie à la pâte souple et crémeuse. Croûte lavée orangée, goût fruité avec une pointe de noisette.',
    prix: 10.20,
    poids: 450,
    type: TypeFromage.PATE_MOLLE,
    lait: TypeLait.VACHE,
    image: '/images/fromages/camembert.svg',
    disponible: false,
    stock: 0
  },
  {
    id: '9',
    nom: 'Ossau-Iraty',
    description: 'Fromage basque au lait de brebis, pâte pressée non cuite. Goût doux et fruité avec des arômes de noisette. Parfait avec de la confiture de cerises noires.',
    prix: 13.50,
    poids: 300,
    type: TypeFromage.PATE_DURE,
    lait: TypeLait.BREBIS,
    image: '/images/fromages/comte.svg',
    disponible: true,
    stock: 7
  },
  {
    id: '10',
    nom: 'Munster fermier',
    description: 'Fromage alsacien à croûte lavée, au goût prononcé et à l\'odeur caractéristique. Pâte moelleuse et fondante, traditionnellement accompagné de cumin.',
    prix: 8.90,
    poids: 200,
    type: TypeFromage.PATE_MOLLE,
    lait: TypeLait.VACHE,
    image: '/images/fromages/camembert.svg',
    disponible: true,
    stock: 9
  }
]

// Fromages mis en avant sur la page d'accueil - Seulement 3 coups de cœur
export const fromagesPhares = fromagesData.filter(fromage => 
  ['1', '2', '3'].includes(fromage.id)
) 