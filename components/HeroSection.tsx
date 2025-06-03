import Link from 'next/link'
import { ChefHat, Star, ArrowRight, Award } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 warm-gradient">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Badge coloré */}
          <div className="inline-flex items-center space-x-2 glass-card-cream text-orange-800 px-6 py-3 rounded-full text-sm font-bold mb-8 animate-slide-up hover-glow-gold">
            <ChefHat className="h-5 w-5 text-orange-600" />
            <span>Fromages artisanaux d&apos;exception</span>
            <Award className="h-4 w-4 text-yellow-500" />
          </div>

          {/* Titre principal coloré */}
          <h1 className="text-5xl md:text-7xl font-bold text-amber-900 mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Victor la{' '}
            <span className="accent-text-gold">Fromagerie</span>
          </h1>

          {/* Sous-titre chaleureux */}
          <p className="text-xl md:text-2xl text-amber-800 mb-12 max-w-2xl mx-auto animate-slide-up font-medium" style={{ animationDelay: '0.2s' }}>
            Découvrez notre sélection de fromages artisanaux d&apos;exception.
            <br />
            <span className="accent-text-green">Commandez en ligne, récupérez en magasin.</span>
          </p>

          {/* Étoiles de qualité colorées */}
          <div className="flex items-center justify-center space-x-1 mb-8 animate-slide-up hover-scale-warm" style={{ animationDelay: '0.3s' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-yellow-500 fill-current animate-float" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
            <span className="ml-3 text-amber-800 font-bold text-lg">Excellence artisanale</span>
          </div>

          {/* Boutons d'action colorés */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Link href="/fromages">
              <button className="glass-button group">
                Découvrir nos fromages
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </Link>
            <Link href="/#infos-pratiques">
              <button className="glass-button-secondary">
                Comment ça marche
              </button>
            </Link>
          </div>

          {/* Statistiques colorées */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <div className="cheese-card hover-lift-cheese">
              <div className="text-4xl font-bold accent-text-gold mb-2">50+</div>
              <div className="text-amber-700 font-medium">Variétés de fromages</div>
            </div>
            <div className="cheese-card hover-lift-cheese" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold accent-text-green mb-2">100%</div>
              <div className="text-amber-700 font-medium">Artisanal</div>
            </div>
            <div className="cheese-card hover-lift-cheese" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold cheese-gradient bg-clip-text text-transparent mb-2">24h</div>
              <div className="text-amber-700 font-medium">Préparation</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 