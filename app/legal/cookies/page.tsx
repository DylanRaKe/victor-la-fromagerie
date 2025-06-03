import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Cookie, Settings, BarChart3, Shield } from 'lucide-react'

export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link 
          href="/" 
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à l&apos;accueil
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Cookie className="h-16 w-16 mx-auto text-primary mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Politique des cookies
          </h1>
          <p className="text-muted-foreground text-lg">
            Comprendre comment nous utilisons les cookies sur notre site
          </p>
        </div>

        <div className="space-y-8">
          {/* Qu'est-ce qu'un cookie */}
          <Card>
            <CardHeader>
              <CardTitle>Qu&apos;est-ce qu&apos;un cookie ?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Un cookie est un petit fichier texte déposé sur votre ordinateur, 
                tablette ou smartphone lorsque vous visitez un site web. Il permet 
                au site de mémoriser vos actions et préférences (comme votre panier 
                d&apos;achat, vos préférences de langue, etc.) pendant une certaine période, 
                pour que vous n&apos;ayez pas à les ressaisir à chaque fois que vous 
                revenez sur le site ou naviguez d&apos;une page à l&apos;autre.
              </p>
            </CardContent>
          </Card>

          {/* Types de cookies */}
          <Card>
            <CardHeader>
              <CardTitle>Types de cookies que nous utilisons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Cookies essentiels */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold">Cookies essentiels</h4>
                    </div>
                    <Badge variant="secondary">Obligatoires</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">
                    Ces cookies sont nécessaires au fonctionnement du site et ne peuvent 
                    pas être désactivés. Ils permettent notamment de mémoriser votre panier 
                    d&apos;achat et vos préférences de navigation.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">panier-victor</span>
                      <span className="text-muted-foreground">Mémorisation du panier</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">session-id</span>
                      <span className="text-muted-foreground">Identification de session</span>
                    </div>
                  </div>
                </div>

                {/* Cookies de préférences */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Settings className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold">Cookies de préférences</h4>
                    </div>
                    <Badge variant="outline">Optionnels</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">
                    Ces cookies permettent au site de mémoriser vos choix (comme votre 
                    nom d&apos;utilisateur, votre langue ou la région où vous vous trouvez) 
                    et de fournir des fonctionnalités améliorées et plus personnelles.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">preferences-ui</span>
                      <span className="text-muted-foreground">Préférences d&apos;interface</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">last-visit</span>
                      <span className="text-muted-foreground">Dernière visite</span>
                    </div>
                  </div>
                </div>

                {/* Cookies analytiques */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5 text-purple-600" />
                      <h4 className="font-semibold">Cookies analytiques</h4>
                    </div>
                    <Badge variant="outline">Optionnels</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">
                    Ces cookies nous aident à comprendre comment les visiteurs interagissent 
                    avec notre site web en collectant et en rapportant des informations de 
                    manière anonyme. Cela nous permet d&apos;améliorer notre site.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">_ga</span>
                      <span className="text-muted-foreground">Google Analytics</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">_gid</span>
                      <span className="text-muted-foreground">Google Analytics</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Durée de conservation */}
          <Card>
            <CardHeader>
              <CardTitle>Durée de conservation des cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium">Cookies de session</span>
                  <span className="text-muted-foreground">Supprimés à la fermeture du navigateur</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium">Cookies persistants</span>
                  <span className="text-muted-foreground">1 à 24 mois selon le type</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium">Cookies analytiques</span>
                  <span className="text-muted-foreground">13 mois maximum</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gestion des cookies */}
          <Card>
            <CardHeader>
              <CardTitle>Comment gérer vos cookies ?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Via votre navigateur</h4>
                <p className="text-muted-foreground text-sm mb-3">
                  Vous pouvez configurer votre navigateur pour accepter ou refuser 
                  les cookies. Voici comment procéder pour les navigateurs les plus courants :
                </p>
                <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                  <li><strong>Chrome :</strong> Paramètres → Confidentialité et sécurité → Cookies</li>
                  <li><strong>Firefox :</strong> Paramètres → Vie privée et sécurité → Cookies</li>
                  <li><strong>Safari :</strong> Préférences → Confidentialité → Cookies</li>
                  <li><strong>Edge :</strong> Paramètres → Cookies et autorisations de site</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Via notre site</h4>
                <p className="text-muted-foreground text-sm mb-3">
                  Lors de votre première visite, une bannière vous permet de choisir 
                  quels types de cookies vous souhaitez accepter. Vous pouvez modifier 
                  vos préférences à tout moment.
                </p>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Gérer mes préférences
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Conséquences du refus */}
          <Card>
            <CardHeader>
              <CardTitle>Conséquences du refus des cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Cookies essentiels</h4>
                  <p className="text-muted-foreground text-sm">
                    Le refus de ces cookies peut empêcher le bon fonctionnement du site, 
                    notamment la mémorisation de votre panier d&apos;achat et la finalisation 
                    de vos commandes.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Cookies de préférences</h4>
                  <p className="text-muted-foreground text-sm">
                    Le refus de ces cookies peut réduire la personnalisation de votre 
                    expérience sur le site, mais n&apos;affecte pas les fonctionnalités principales.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Cookies analytiques</h4>
                  <p className="text-muted-foreground text-sm">
                    Le refus de ces cookies n&apos;affecte pas votre navigation, mais nous 
                    empêche d&apos;améliorer notre site en fonction de l&apos;usage qui en est fait.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cookies tiers */}
          <Card>
            <CardHeader>
              <CardTitle>Cookies de tiers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Nous utilisons des services de tiers qui peuvent déposer leurs propres cookies :
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Google Analytics</p>
                    <p className="text-sm text-muted-foreground">Analyse d&apos;audience</p>
                  </div>
                  <a 
                    href="https://policies.google.com/privacy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm"
                  >
                    Politique de confidentialité
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Questions sur les cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Pour toute question concernant notre utilisation des cookies, 
                vous pouvez nous contacter :
              </p>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  <strong>Par email :</strong> cookies@victor-fromagerie.fr
                </p>
                <p className="text-muted-foreground">
                  <strong>Par courrier :</strong><br />
                  Victor la Fromagerie - Service Cookies<br />
                  123 Rue des Fromages<br />
                  75001 Paris
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <Button asChild variant="outline">
            <Link href="/legal/mentions">
              Mentions légales
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/legal/rgpd">
              Politique de confidentialité
            </Link>
          </Button>
          <Button asChild>
            <Link href="/">
              Retour à l&apos;accueil
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 