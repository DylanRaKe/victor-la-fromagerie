import { NextRequest, NextResponse } from 'next/server'
import { FromageService } from '@/lib/services/fromage.service'

export async function GET() {
  try {
    const fromages = await FromageService.getAll()
    return NextResponse.json(fromages)
  } catch (error) {
    console.error('Erreur lors de la récupération des fromages:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des fromages' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const fromage = await FromageService.create(data)
    return NextResponse.json(fromage, { status: 201 })
  } catch (error) {
    console.error('Erreur lors de la création du fromage:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création du fromage' },
      { status: 500 }
    )
  }
} 