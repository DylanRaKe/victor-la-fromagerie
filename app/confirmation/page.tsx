import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Calendar, MapPin, Mail } from 'lucide-react'

export default function ConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Message de confirmation */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-600">
            Commande confirmée !
          </h1>
          <p className="text-muted-foreground text-lg">
            Merci pour votre commande. Nous préparons vos fromages avec soin.
          </p>
        </div>

        {/* Informations importantes */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Confirmation par email</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Vous allez recevoir un email de confirmation avec tous les détails de votre commande 
                dans les prochaines minutes. Pensez à vérifier vos spams si vous ne le recevez pas.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Retrait de votre commande</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Quand récupérer ?</h4>
                <p className="text-muted-foreground">
                  Votre commande sera prête au créneau que vous avez sélectionné. 
                  Nous vous recommandons d&apos;arriver à l&apos;heure pour garantir la fraîcheur optimale.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Que faut-il apporter ?</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Une pièce d&apos;identité</li>
                  <li>• Votre email de confirmation (sur téléphone ou imprimé)</li>
                  <li>• Un moyen de paiement (espèces, carte bancaire)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Adresse du magasin</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">Victor la Fromagerie</p>
                <p className="text-muted-foreground">
                  123 Rue des Fromages<br />
                  75001 Paris
                </p>
                <p className="text-muted-foreground">
                  <strong>Horaires :</strong><br />
                  Lundi - Vendredi : 9h - 18h<br />
                  Samedi : 9h - 17h<br />
                  Dimanche : Fermé
                </p>
                <p className="text-muted-foreground">
                  <strong>Téléphone :</strong> 01 23 45 67 89
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <Button asChild variant="outline">
            <Link href="/fromages">
              Continuer mes achats
            </Link>
          </Button>
          <Button asChild>
            <Link href="/">
              Retour à l&apos;accueil
            </Link>
          </Button>
        </div>

        {/* Message de remerciement */}
        <div className="text-center mt-12 p-6 bg-accent/20 rounded-lg">
          <h3 className="font-semibold mb-2">Merci de votre confiance !</h3>
          <p className="text-muted-foreground text-sm">
            Chez Victor la Fromagerie, nous sélectionnons chaque fromage avec passion 
            pour vous offrir le meilleur de l&apos;artisanat fromager français.
          </p>
        </div>
      </div>
    </div>
  )
} 