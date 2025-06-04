import Link from 'next/link'
import { FromageCard } from '@/components/fromage/FromageCard'
import { FromageService } from '@/lib/services/fromage.service'
import { Star, ArrowRight, Crown, Sparkles, Award } from 'lucide-react'

export async function ProduitsPhares() {
  const fromagesPhares = await FromageService.getFeatured()
  return (
    <section id="produits-phares" className="py-20 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #fde68a 100%)'
    }}>
      {/* Éléments décoratifs harmonisés */}
      <div className="absolute top-10 left-10 opacity-10">
        <div className="w-32 h-32 rounded-full animate-float" style={{
          background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)'
        }}></div>
      </div>
      <div className="absolute bottom-10 right-10 opacity-10">
        <div className="w-24 h-24 rounded-full animate-float" style={{ 
          animationDelay: '1s',
          background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          {/* Badge harmonisé */}
          <div className="inline-flex items-center space-x-3 px-8 py-4 rounded-full text-sm font-bold mb-8 hover-glow-gold" style={{
            background: 'rgba(255, 255, 255, 0.9)',
            border: '2px solid #f59e0b',
            boxShadow: '0 4px 20px rgba(245, 158, 11, 0.3)'
          }}>
            <Crown className="h-6 w-6 text-yellow-600 animate-bounce-gentle" />
            <span className="text-lg text-amber-900">Sélection du fromager</span>
            <Award className="h-5 w-5 text-yellow-600" />
            <Star className="h-4 w-4 text-yellow-600 fill-current animate-float" />
          </div>

          {/* Titre harmonisé */}
          <h2 className="text-5xl md:text-6xl font-bold text-amber-900 mb-8">
            Nos <span className="relative" style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              coups de cœur
              <div className="absolute -bottom-2 left-0 right-0 h-1 rounded-full" style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)'
              }}></div>
            </span>
          </h2>

          {/* Description harmonisée */}
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-xl text-amber-900 font-medium">
              Découvrez notre sélection de fromages d&apos;exception, 
            </p>
            <p className="text-lg font-medium" style={{
              background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              choisis avec passion par notre maître fromager pour leur caractère unique.
            </p>
            
            {/* Indicateurs de qualité harmonisés */}
            <div className="flex items-center justify-center space-x-6 mt-8">
              <div className="flex items-center space-x-2 px-4 py-2 rounded-full" style={{
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid #f59e0b'
              }}>
                <Sparkles className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-bold text-amber-900">Qualité Premium</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 rounded-full" style={{
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid #16a34a'
              }}>
                <Award className="h-4 w-4 text-green-600" />
                <span className="text-sm font-bold text-green-800">Artisanal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grille des fromages - 3 colonnes pour 3 fromages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
          {fromagesPhares.map((fromage, index) => (
            <div 
              key={fromage.id} 
              className="animate-slide-up hover-lift-cheese"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="relative">
                <FromageCard fromage={fromage} />
                
                {/* Badge "Coup de cœur" harmonisé pour le premier fromage */}
                {index === 0 && (
                  <div className="absolute -top-3 -right-3 z-10">
                    <div className="text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 animate-bounce-gentle" style={{
                      background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
                      boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)'
                    }}>
                      <Crown className="h-3 w-3" />
                      <span>Coup de cœur</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Section call-to-action harmonisée */}
        <div className="text-center animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <div className="max-w-md mx-auto p-8 rounded-2xl" style={{
            background: 'rgba(255, 255, 255, 0.9)',
            border: '2px solid #fed7aa',
            boxShadow: '0 8px 32px rgba(245, 158, 11, 0.2)'
          }}>
            <div className="mb-6">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)'
              }}>
                <Sparkles className="h-8 w-8 text-white animate-float" />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Plus de 50 variétés vous attendent
              </h3>
              <p className="text-amber-900 font-medium">
                Explorez notre collection complète de fromages artisanaux
              </p>
            </div>
            
            <Link href="/fromages">
              <button className="glass-button-secondary group text-lg px-8 py-4 w-full">
                <span>Découvrir tous nos fromages</span>
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 