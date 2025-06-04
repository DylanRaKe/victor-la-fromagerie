import { FromagesList } from '@/components/fromage/FromagesList'
import { FromageService } from '@/lib/services/fromage.service'
import { Cookie, Sparkles } from 'lucide-react'

export default async function FromagesPage() {
  const fromagesData = await FromageService.getAvailable()

  return (
    <div className="min-h-screen warm-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Header coloré */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center space-x-2 glass-card-cream text-orange-800 px-6 py-3 rounded-full text-sm font-bold mb-6 hover-glow-gold">
            <Cookie className="h-5 w-5 text-orange-600" />
            <span>Collection artisanale</span>
            <Sparkles className="h-4 w-4 text-yellow-500" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-amber-900">
            Nos <span className="accent-text-gold">Fromages</span>
          </h1>
          <p className="text-xl text-amber-800 max-w-2xl mx-auto font-medium">
            Découvrez notre sélection de fromages artisanaux, 
            <br />
            <span className="accent-text-green">soigneusement choisis pour leur qualité exceptionnelle.</span>
          </p>
        </div>

        <FromagesList fromages={fromagesData} />
      </div>
    </div>
  )
} 