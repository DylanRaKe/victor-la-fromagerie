import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'

export default function MentionsLegalesPage() {
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
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Mentions légales</h1>

        <div className="space-y-8">
          {/* Éditeur du site */}
          <Card>
            <CardHeader>
              <CardTitle>Éditeur du site</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Victor la Fromagerie</h4>
                <p className="text-muted-foreground">
                  Société à responsabilité limitée (SARL)<br />
                  Capital social : 10 000 €<br />
                  RCS Paris : 123 456 789<br />
                  SIRET : 123 456 789 00012<br />
                  Code APE : 4729Z
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Adresse</h4>
                <p className="text-muted-foreground">
                  123 Rue des Fromages<br />
                  75001 Paris<br />
                  France
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Contact</h4>
                <p className="text-muted-foreground">
                  Téléphone : 01 23 45 67 89<br />
                  Email : contact@victor-fromagerie.fr
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Directeur de la publication</h4>
                <p className="text-muted-foreground">
                  Victor Fromage, Gérant
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Hébergement */}
          <Card>
            <CardHeader>
              <CardTitle>Hébergement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Ce site est hébergé par :<br />
                <strong>Vercel Inc.</strong><br />
                340 S Lemon Ave #4133<br />
                Walnut, CA 91789<br />
                États-Unis
              </p>
            </CardContent>
          </Card>

          {/* Propriété intellectuelle */}
          <Card>
            <CardHeader>
              <CardTitle>Propriété intellectuelle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                L&apos;ensemble de ce site relève de la législation française et internationale 
                sur le droit d&apos;auteur et la propriété intellectuelle. Tous les droits de 
                reproduction sont réservés, y compris pour les documents téléchargeables et 
                les représentations iconographiques et photographiques.
              </p>
              
              <p className="text-muted-foreground">
                La reproduction de tout ou partie de ce site sur un support électronique 
                quel qu&apos;il soit est formellement interdite sauf autorisation expresse du 
                directeur de la publication.
              </p>
            </CardContent>
          </Card>

          {/* Responsabilité */}
          <Card>
            <CardHeader>
              <CardTitle>Limitation de responsabilité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Les informations contenues sur ce site sont aussi précises que possible et 
                le site remis à jour à différentes périodes de l&apos;année, mais peut toutefois 
                contenir des inexactitudes ou des omissions.
              </p>
              
              <p className="text-muted-foreground">
                Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, 
                merci de bien vouloir le signaler par email, à l&apos;adresse contact@victor-fromagerie.fr, 
                en décrivant le problème de la manière la plus précise possible.
              </p>
            </CardContent>
          </Card>

          {/* Droit applicable */}
          <Card>
            <CardHeader>
              <CardTitle>Droit applicable et attribution de juridiction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Tout litige en relation avec l&apos;utilisation du site victor-fromagerie.fr 
                est soumis au droit français. Il est fait attribution exclusive de juridiction 
                aux tribunaux compétents de Paris.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Pour toute question relative aux présentes mentions légales, vous pouvez 
                nous contacter :
              </p>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  <strong>Par email :</strong> contact@victor-fromagerie.fr
                </p>
                <p className="text-muted-foreground">
                  <strong>Par téléphone :</strong> 01 23 45 67 89
                </p>
                <p className="text-muted-foreground">
                  <strong>Par courrier :</strong><br />
                  Victor la Fromagerie<br />
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
            <Link href="/legal/rgpd">
              Politique de confidentialité
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/legal/cookies">
              Politique des cookies
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