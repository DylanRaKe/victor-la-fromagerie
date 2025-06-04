import { NextRequest, NextResponse } from 'next/server'
import { CommandeService } from '@/lib/services/commande.service'

export async function GET() {
  try {
    const commandes = await CommandeService.getAll()
    return NextResponse.json(commandes)
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des commandes' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const commande = await CommandeService.create(data)
    return NextResponse.json(commande, { status: 201 })
  } catch (error) {
    console.error('Erreur lors de la création de la commande:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de la commande' },
      { status: 500 }
    )
  }
} 