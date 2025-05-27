
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { CalendarCog, ClipboardCheck, MessagesSquare, ActivitySquare, BrainCircuit, UserCog, BarChartBig, ShieldCheck, UsersRound, ExternalLink, Plug, LogIn, UserPlus, Clock, AlertTriangle, Send, FolderKanban, MailCheck, Video, Briefcase, Building, DollarSign, ChevronDown, ClipboardEdit, LifeBuoy, CreditCard, FileSpreadsheet, DownloadCloud, HeartPulse, MapPin, ShoppingBag, Lightbulb } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import React from "react";

const GOOGLE_FORM_VET_EARLY_ACCESS_URL = "https://docs.google.com/forms/d/e/1FAIpQLSe_placeholder_form_id_for_petsync_vets/viewform?usp=sf_link";

export default function VetPortalInfoPage() {

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Page-specific simple navigation */}
      <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Logo />
          <div className="space-x-4">
            <Link href={GOOGLE_FORM_VET_EARLY_ACCESS_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Registrarse (Acceso Temprano)
            </Link>
            <Link href="#contacto-portal" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Contáctanos
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-primary/10 via-background to-background text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              Portal PetSync para Veterinarias: Optimiza tu Práctica, Cuida Mejor.
            </h1>
            <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
              Descubre cómo PetSync puede revolucionar la gestión de tu clínica y la conexión con tus clientes a través de nuestra presentación detallada.
            </p>
          </div>
        </section>

        {/* Canva Embed Section - Main Focus */}
        <section id="presentation-vet-portal" className="py-8 md:py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Explora el Portal PetSync en Detalle
              </h2>
            </div>
            <div style={{
              position: 'relative',
              width: '100%',
              height: 0,
              paddingTop: '56.2225%', // Aspect ratio 16:9
              paddingBottom: 0,
              boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
              marginTop: '1.6em',
              marginBottom: '0.9em',
              overflow: 'hidden',
              borderRadius: '8px',
              willChange: 'transform'
            }}>
              <iframe
                loading="lazy"
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  top: 0,
                  left: 0,
                  border: 'none',
                  padding: 0,
                  margin: 0
                }}
                src="https://www.canva.com/design/DAGoMHRHfj4/w_dUftQymojeLI2Qa10vGw/view?embed"
                allowFullScreen
                allow="fullscreen"
                title="Presentación del Portal PetSync para Veterinarias"
              ></iframe>
            </div>
            <p className="text-center mt-4 text-sm text-muted-foreground">
              <a
                href="https://www.canva.com/design/DAGoMHRHfj4/w_dUftQymojeLI2Qa10vGw/view?utm_content=DAGoMHRHfj4&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary underline"
              >
                Presentación del Portal PetSync para Veterinarias
              </a>
              {' '}por PetSync Team.
            </p>
          </div>
        </section>
        
        {/* Early Access CTA Section */}
        <section id="early-access-vet" className="py-12 md:py-16 bg-primary/10">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              ¿Interesado en Potenciar tu Clínica con PetSync?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Solicita una demostración personalizada o únete a nuestro programa de acceso anticipado para ser de los primeros en experimentar el poder de nuestra plataforma.
            </p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform" asChild>
                    <Link href={GOOGLE_FORM_VET_EARLY_ACCESS_URL} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      Solicitar Demo / Más Información <ExternalLink className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Serás redirigido a un formulario de Google para completar tu solicitud.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </section>
        
        {/* Contact section placeholder */}
        <section id="contacto-portal" className="py-12 md:py-16 bg-background">
            <div className="container mx-auto px-4 max-w-xl text-center">
                <h2 className="text-2xl font-bold text-foreground mb-4">¿Preguntas? Contáctanos</h2>
                <CardDescription className="text-muted-foreground mb-6">
                    Si tienes alguna duda sobre el Portal PetSync para Veterinarias o el programa de acceso temprano, no dudes en escribirnos.
                </CardDescription>
                <Button variant="outline" asChild>
                    <Link href="mailto:soporte-vets@petsync.example.com">Enviar un Email</Link>
                </Button>
                 <p className="text-xs text-muted-foreground mt-4">(Email de ejemplo: soporte-vets@petsync.example.com)</p>
            </div>
        </section>

      </main>

      {/* Page-specific simple footer */}
      <footer className="border-t bg-background">
        <div className="container py-8 px-4 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} PetSync. Todos los derechos reservados.</p>
          <div className="mt-4 sm:mt-0">
             <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Centro de ayuda (Próximamente)
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
