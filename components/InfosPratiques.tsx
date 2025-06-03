import { Clock, MapPin, ShoppingBag, CheckCircle, Zap } from 'lucide-react'

export function InfosPratiques() {
  const etapes = [
    {
      icon: ShoppingBag,
      titre: "Choisissez vos fromages",
      description: "Parcourez notre sélection et ajoutez vos fromages préférés à votre panier.",
      numero: "01"
    },
    {
      icon: Clock,
      titre: "Sélectionnez un créneau",
      description: "Choisissez le jour et l'heure qui vous conviennent pour récupérer votre commande.",
      numero: "02"
    },
    {
      icon: CheckCircle,
      titre: "Confirmez votre commande",
      description: "Renseignez vos coordonnées et validez. Vous recevrez une confirmation par email.",
      numero: "03"
    },
    {
      icon: MapPin,
      titre: "Récupérez en magasin",
      description: "Venez récupérer vos fromages frais directement en magasin au créneau choisi.",
      numero: "04"
    }
  ]

  return (
    <section id="infos-pratiques" className="py-20 warm-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          {/* Badge coloré */}
          <div className="inline-flex items-center space-x-2 glass-card-cream text-orange-800 px-6 py-3 rounded-full text-sm font-bold mb-6 hover-glow-gold">
            <Zap className="h-5 w-5 text-yellow-500" />
            <span>Click & Collect</span>
            <Clock className="h-4 w-4 text-orange-600" />
          </div>

          {/* Titre coloré */}
          <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
            Comment <span className="accent-text-gold">ça marche</span>
          </h2>

          {/* Description chaleureuse */}
          <p className="text-xl text-amber-800 max-w-2xl mx-auto font-medium">
            Un processus simple et rapide pour commander vos fromages préférés 
            <br />
            <span className="accent-text-green">et les récupérer en magasin.</span>
          </p>
        </div>

        {/* Étapes colorées */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {etapes.map((etape, index) => {
            const IconComponent = etape.icon
            return (
              <div 
                key={index}
                className="cheese-card text-center animate-slide-up hover-lift-cheese"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Numéro coloré */}
                <div className="inline-flex items-center justify-center w-14 h-14 cheese-gradient text-white rounded-full font-bold text-xl mb-4 animate-bounce-gentle">
                  {etape.numero}
                </div>

                {/* Icône colorée */}
                <div className="flex justify-center mb-4">
                  <div className="p-4 glass-card-cream rounded-xl hover-glow-gold">
                    <IconComponent className="h-8 w-8 text-orange-600" />
                  </div>
                </div>

                {/* Titre coloré */}
                <h3 className="text-xl font-bold text-amber-900 mb-3">
                  {etape.titre}
                </h3>

                {/* Description */}
                <p className="text-amber-700 leading-relaxed font-medium">
                  {etape.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Informations pratiques colorées */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-up" style={{ animationDelay: '0.5s' }}>
          {/* Horaires */}
          <div className="cheese-card hover-lift-cheese">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 cheese-gradient rounded-xl">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold accent-text-gold">Horaires d&apos;ouverture</h3>
            </div>
            <div className="space-y-3 text-amber-800">
              <div className="flex justify-between items-center p-2 rounded-lg hover:bg-orange-50 transition-colors">
                <span className="font-medium">Lundi - Vendredi</span>
                <span className="font-bold text-orange-600">9h00 - 19h00</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg hover:bg-orange-50 transition-colors">
                <span className="font-medium">Samedi</span>
                <span className="font-bold text-orange-600">8h00 - 20h00</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg hover:bg-orange-50 transition-colors">
                <span className="font-medium">Dimanche</span>
                <span className="font-bold text-orange-600">9h00 - 13h00</span>
              </div>
            </div>
          </div>

          {/* Adresse */}
          <div className="cheese-card hover-lift-cheese">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 herb-gradient rounded-xl">
                <MapPin className="h-6 w-6 text-green-700" />
              </div>
              <h3 className="text-xl font-bold accent-text-green">Notre adresse</h3>
            </div>
            <div className="text-amber-800 space-y-2">
              <p className="font-bold text-lg text-amber-900">Victor la Fromagerie</p>
              <p className="font-medium">123 Rue des Fromages</p>
              <p className="font-medium">75001 Paris</p>
              <p className="mt-4 font-bold text-lg accent-text-gold">01 23 45 67 89</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 