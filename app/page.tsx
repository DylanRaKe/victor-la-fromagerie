import { HeroSection } from '@/components/HeroSection'
import { ProduitsPhares } from '@/components/ProduitsPhares'
import { InfosPratiques } from '@/components/InfosPratiques'

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ProduitsPhares />
      <InfosPratiques />
    </div>
  )
}
