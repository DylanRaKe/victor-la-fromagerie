import { notFound } from 'next/navigation'
import { FromageDetail } from '@/components/fromage/FromageDetail'
import { FromageService } from '@/lib/services/fromage.service'

interface FromageDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function FromageDetailPage({ params }: FromageDetailPageProps) {
  const { id } = await params
  const fromage = await FromageService.getById(id)
  
  if (!fromage) {
    notFound()
  }

  return <FromageDetail fromage={fromage} />
} 