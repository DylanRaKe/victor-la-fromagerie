import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Heart, Cookie } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative mt-16 animate-fade-in" style={{
      background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 50%, #dc2626 100%)'
    }}>
      {/* Overlay pour améliorer le contraste */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Informations de contact */}
          <div className="animate-slide-in-left space-y-4">
            <div className="flex items-center space-x-2 mb-6">
              <Cookie className="h-6 w-6 text-yellow-200 animate-float" />
              <h3 className="text-xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                Victor la Fromagerie
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-white hover:text-yellow-200 transition-all duration-300 group hover-lift-cheese">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg group-hover:bg-white/30 border border-white/30">
                  <MapPin className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <p className="font-medium" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>123 Rue des Fromages</p>
                  <p className="font-medium" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>75001 Paris</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-white hover:text-yellow-200 transition-all duration-300 group hover-lift-cheese">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg group-hover:bg-white/30 border border-white/30">
                  <Phone className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
                </div>
                <span className="font-medium" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>01 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-3 text-white hover:text-yellow-200 transition-all duration-300 group hover-lift-cheese">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg group-hover:bg-white/30 border border-white/30">
                  <Mail className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
                </div>
                <span className="font-medium" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>contact@victor-fromagerie.fr</span>
              </div>
            </div>
          </div>

          {/* Horaires */}
          <div className="animate-slide-up space-y-4" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                Horaires d&apos;ouverture
              </h3>
            </div>
            <div className="space-y-3 text-white">
              <div className="flex justify-between items-center p-3 rounded-lg hover:bg-white/10 transition-colors backdrop-blur-sm border border-white/20">
                <span className="font-medium" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>Lundi - Vendredi</span>
                <span className="font-bold text-yellow-200" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>9h00 - 19h00</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg hover:bg-white/10 transition-colors backdrop-blur-sm border border-white/20">
                <span className="font-medium" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>Samedi</span>
                <span className="font-bold text-yellow-200" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>8h00 - 20h00</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg hover:bg-white/10 transition-colors backdrop-blur-sm border border-white/20">
                <span className="font-medium" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>Dimanche</span>
                <span className="font-bold text-yellow-200" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>9h00 - 13h00</span>
              </div>
            </div>
          </div>

          {/* Liens utiles */}
          <div className="animate-slide-in-right space-y-4" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-bold text-white mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              Liens utiles
            </h3>
            <div className="space-y-3">
              <Link href="/fromages" className="block text-white hover:text-yellow-200 transition-all duration-300 font-medium hover-lift-cheese p-2 rounded hover:bg-white/10" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                Nos fromages
              </Link>
              <Link href="/admin" className="block text-white hover:text-yellow-200 transition-all duration-300 font-medium hover-lift-cheese p-2 rounded hover:bg-white/10" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                Administration
              </Link>
              <Link href="/legal/mentions" className="block text-white hover:text-yellow-200 transition-all duration-300 font-medium hover-lift-cheese p-2 rounded hover:bg-white/10" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                Mentions légales
              </Link>
              <Link href="/legal/rgpd" className="block text-white hover:text-yellow-200 transition-all duration-300 font-medium hover-lift-cheese p-2 rounded hover:bg-white/10" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                Politique de confidentialité
              </Link>
              <Link href="/legal/cookies" className="block text-white hover:text-yellow-200 transition-all duration-300 font-medium hover-lift-cheese p-2 rounded hover:bg-white/10" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                Gestion des cookies
              </Link>
            </div>
          </div>
        </div>

        {/* Séparateur avec meilleur contraste */}
        <div className="border-t-2 border-white/30 mt-8 pt-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white text-sm font-medium" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
              © 2024 Victor la Fromagerie. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-2 text-white hover-scale-warm">
              <span className="text-sm font-medium" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>Fait avec</span>
              <Heart className="h-4 w-4 text-red-300 fill-current animate-bounce-gentle" />
              <span className="text-sm font-medium" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>pour les amateurs de fromage</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 