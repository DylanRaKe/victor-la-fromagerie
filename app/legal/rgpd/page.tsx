import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Shield, Eye, Lock, Trash2 } from 'lucide-react'

export default function RGPDPage() {
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
          <Shield className="h-16 w-16 mx-auto text-primary mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Politique de confidentialité
          </h1>
          <p className="text-muted-foreground text-lg">
            Nous respectons votre vie privée et protégeons vos données personnelles
          </p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Qui sommes-nous ?</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Victor la Fromagerie, société à responsabilité limitée, située au 
                123 Rue des Fromages, 75001 Paris, est responsable du traitement de 
                vos données personnelles. Nous nous engageons à protéger et respecter 
                votre vie privée conformément au Règlement Général sur la Protection 
                des Données (RGPD).
              </p>
            </CardContent>
          </Card>

          {/* Données collectées */}
          <Card>
            <CardHeader>
              <CardTitle>Quelles données collectons-nous ?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Données de commande</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Nom et prénom</li>
                  <li>Adresse email</li>
                  <li>Numéro de téléphone (optionnel)</li>
                  <li>Détails de votre commande</li>
                  <li>Créneau de retrait choisi</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Données techniques</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Adresse IP</li>
                  <li>Type de navigateur</li>
                  <li>Pages visitées sur notre site</li>
                  <li>Date et heure de visite</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Finalités */}
          <Card>
            <CardHeader>
              <CardTitle>Pourquoi utilisons-nous vos données ?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Traitement des commandes</h4>
                  <p className="text-muted-foreground">
                    Nous utilisons vos données pour traiter votre commande, vous envoyer 
                    une confirmation par email et préparer votre retrait en magasin.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Communication</h4>
                  <p className="text-muted-foreground">
                    Nous pouvons vous contacter par email ou téléphone concernant votre 
                    commande ou pour vous informer de problèmes éventuels.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Amélioration du service</h4>
                  <p className="text-muted-foreground">
                    Les données techniques nous aident à améliorer notre site web et 
                    nos services.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Base légale */}
          <Card>
            <CardHeader>
              <CardTitle>Base légale du traitement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Exécution du contrat</p>
                    <p className="text-muted-foreground text-sm">
                      Pour traiter votre commande et assurer le service de click & collect
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Intérêt légitime</p>
                    <p className="text-muted-foreground text-sm">
                      Pour améliorer nos services et assurer la sécurité de notre site
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Conservation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="h-5 w-5" />
                <span>Combien de temps conservons-nous vos données ?</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium">Données de commande</span>
                  <span className="text-muted-foreground">3 ans</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium">Données techniques</span>
                  <span className="text-muted-foreground">13 mois</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium">Emails de confirmation</span>
                  <span className="text-muted-foreground">1 an</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Droits */}
          <Card>
            <CardHeader>
              <CardTitle>Vos droits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold">Droit d&apos;accès</h4>
                    <p className="text-sm text-muted-foreground">
                      Connaître les données que nous détenons sur vous
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">Droit de rectification</h4>
                    <p className="text-sm text-muted-foreground">
                      Corriger des données inexactes
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">Droit à l&apos;effacement</h4>
                    <p className="text-sm text-muted-foreground">
                      Demander la suppression de vos données
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold">Droit à la portabilité</h4>
                    <p className="text-sm text-muted-foreground">
                      Récupérer vos données dans un format lisible
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">Droit d&apos;opposition</h4>
                    <p className="text-sm text-muted-foreground">
                      Vous opposer au traitement de vos données
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">Droit de limitation</h4>
                    <p className="text-sm text-muted-foreground">
                      Limiter le traitement de vos données
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sécurité */}
          <Card>
            <CardHeader>
              <CardTitle>Sécurité de vos données</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Nous mettons en place des mesures techniques et organisationnelles 
                appropriées pour protéger vos données personnelles :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Chiffrement des données en transit (HTTPS)</li>
                <li>Accès limité aux données par le personnel autorisé</li>
                <li>Sauvegarde régulière des données</li>
                <li>Mise à jour régulière des systèmes de sécurité</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trash2 className="h-5 w-5" />
                <span>Exercer vos droits</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Pour exercer vos droits ou pour toute question concernant le traitement 
                de vos données personnelles, vous pouvez nous contacter :
              </p>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  <strong>Par email :</strong> rgpd@victor-fromagerie.fr
                </p>
                <p className="text-muted-foreground">
                  <strong>Par courrier :</strong><br />
                  Victor la Fromagerie - Service RGPD<br />
                  123 Rue des Fromages<br />
                  75001 Paris
                </p>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Nous nous engageons à répondre à votre demande dans un délai d&apos;un mois.
              </p>
            </CardContent>
          </Card>

          {/* Réclamation */}
          <Card>
            <CardHeader>
              <CardTitle>Droit de réclamation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Si vous estimez que le traitement de vos données personnelles constitue 
                une violation du RGPD, vous avez le droit d&apos;introduire une réclamation 
                auprès de la Commission Nationale de l&apos;Informatique et des Libertés (CNIL) : 
                <a href="https://www.cnil.fr" className="text-primary hover:underline ml-1">
                  www.cnil.fr
                </a>
              </p>
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