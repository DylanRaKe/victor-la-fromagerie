import { prisma } from './db'
import { fromagesData } from '@/data/fromages'

export async function seedDatabase() {
  try {
    console.log('🌱 Début de la migration des données...')

    // Nettoyer les données existantes
    await prisma.itemCommande.deleteMany()
    await prisma.commande.deleteMany()
    await prisma.fromage.deleteMany()

    console.log('🧹 Données existantes supprimées')

    // Insérer les fromages
    for (const fromage of fromagesData) {
      await prisma.fromage.create({
        data: {
          id: fromage.id,
          nom: fromage.nom,
          description: fromage.description,
          prix: fromage.prix,
          poids: fromage.poids,
          type: fromage.type,
          lait: fromage.lait,
          image: fromage.image,
          disponible: fromage.disponible,
          stock: fromage.stock
        }
      })
    }

    console.log(`🧀 ${fromagesData.length} fromages importés`)

    console.log('✅ Migration terminée avec succès!')
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error)
    throw error
  }
}

// Exécuter la migration si ce fichier est appelé directement
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Migration terminée')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Erreur:', error)
      process.exit(1)
    })
} 