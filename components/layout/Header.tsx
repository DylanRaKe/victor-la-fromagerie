'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X, Cookie } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePanierStore } from '@/lib/store'
import { useState } from 'react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const nombreItems = usePanierStore((state) => state.getNombreItems())

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card animate-fade-in">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo coloré avec icône */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-2xl font-bold accent-text-gold hover-scale-warm transition-all duration-300"
          >
            <Cookie className="h-8 w-8 text-orange-500 animate-float" />
            <span>Victor la Fromagerie</span>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/fromages" 
              className="text-amber-800 hover:text-orange-600 font-medium transition-all duration-300 hover-lift-cheese relative group"
            >
              Nos Fromages
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/#produits-phares" 
              className="text-amber-800 hover:text-orange-600 font-medium transition-all duration-300 hover-lift-cheese relative group"
            >
              Sélection
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/#infos-pratiques" 
              className="text-amber-800 hover:text-orange-600 font-medium transition-all duration-300 hover-lift-cheese relative group"
            >
              Comment ça marche
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/panier">
              <Button 
                variant="outline" 
                size="sm" 
                className="relative hover-lift-cheese border-2 border-orange-300 text-orange-700 hover:bg-orange-50 hover:border-orange-400 transition-all duration-300"
              >
                <ShoppingCart className="h-4 w-4" />
                {nombreItems > 0 && (
                  <span className="absolute -top-2 -right-2 cheese-gradient text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce-gentle">
                    {nombreItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Menu mobile */}
            <button
              className="md:hidden p-2 hover:bg-orange-100 rounded-lg transition-all duration-300 text-orange-700 hover-scale-warm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-orange-200 animate-slide-up">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/fromages" 
                className="text-amber-800 hover:text-orange-600 font-medium py-2 transition-all duration-300 hover-lift-cheese"
                onClick={() => setIsMenuOpen(false)}
              >
                Nos Fromages
              </Link>
              <Link 
                href="/#produits-phares" 
                className="text-amber-800 hover:text-orange-600 font-medium py-2 transition-all duration-300 hover-lift-cheese"
                onClick={() => setIsMenuOpen(false)}
              >
                Sélection
              </Link>
              <Link 
                href="/#infos-pratiques" 
                className="text-amber-800 hover:text-orange-600 font-medium py-2 transition-all duration-300 hover-lift-cheese"
                onClick={() => setIsMenuOpen(false)}
              >
                Comment ça marche
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
} 