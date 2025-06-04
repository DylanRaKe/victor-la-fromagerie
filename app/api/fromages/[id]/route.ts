import { NextRequest, NextResponse } from 'next/server'
import { FromageService } from '@/lib/services/fromage.service'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const fromage = await FromageService.getById(params.id)
    if (!fromage) {
      return NextResponse.json(
        { error: 'Fromage non trouvé' },
        { status: 404 }
      )
    }
    return NextResponse.json(fromage)
  } catch (error) {
    console.error('Erreur lors de la récupération du fromage:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du fromage' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const fromage = await FromageService.update(params.id, data)
    if (!fromage) {
      return NextResponse.json(
        { error: 'Fromage non trouvé' },
        { status: 404 }
      )
    }
    return NextResponse.json(fromage)
  } catch (error) {
    console.error('Erreur lors de la mise à jour du fromage:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du fromage' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = await FromageService.delete(params.id)
    if (!success) {
      return NextResponse.json(
        { error: 'Fromage non trouvé' },
        { status: 404 }
      )
    }
    return NextResponse.json({ message: 'Fromage supprimé avec succès' })
  } catch (error) {
    console.error('Erreur lors de la suppression du fromage:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du fromage' },
      { status: 500 }
    )
  }
} 