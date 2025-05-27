
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { CalendarCog, ClipboardCheck, MessagesSquare, ActivitySquare, BrainCircuit, UserCog, BarChartBig, ShieldCheck, UsersRound, ExternalLink, Plug, LogIn, UserPlus, Clock, AlertTriangle, Send, FolderKanban, MailCheck, Video, Briefcase, Building, DollarSign, ChevronDown, ClipboardEdit, LifeBuoy, CreditCard, FileSpreadsheet, DownloadCloud, HeartPulse, MapPin, ShoppingBag, Lightbulb, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import React from "react";

const GOOGLE_FORM_VET_EARLY_ACCESS_URL = "https://docs.google.com/forms/d/e/1FAIpQLSe_placeholder_form_id_for_petsync_vets/viewform?usp=sf_link";

// Example data for simplified features
const portalFeatures = [
  {
    icon: CalendarCog,
    title: "Agenda Inteligente y Turnos Online",
    description: "Gestiona tu calendario, programa citas y permite que los tutores reserven online, optimizando tu tiempo y reduciendo ausencias con recordatorios automáticos.",
  },
  {
    icon: ClipboardCheck,
    title: "Historiales Clínicos Digitales",
    description: "Accede y gestiona fichas clínicas completas, centralizadas y seguras para cada paciente. Comparte información relevante con los tutores de forma sencilla.",
  },
  {
    icon: MessagesSquare,
    title: "Comunicación Directa con Tutores",
    description: "Envía recordatorios, resultados y seguimientos directamente a la app PetSync del tutor o a su email, fortaleciendo la relación y asegurando una atención continua.",
  },
  {
    icon: ActivitySquare,
    title: "Gestión de Sala de Espera y Triage",
    description: "Organiza el flujo de pacientes espontáneos y urgencias con un sistema de priorización visual, mejorando la eficiencia y la experiencia en tu clínica (próximamente con más detalle).",
  },
  {
    icon: BrainCircuit,
    title: "Asistencia IA (GIA) para Veterinarios",
    description: "GIA, nuestra IA, te ayudará a optimizar tu tiempo generando resúmenes de consulta, buscando información relevante en historiales y más (próximamente).",
  },
];


export default function VetPortalPage() {

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
              Descubre herramientas inteligentes diseñadas para la gestión eficiente de tu clínica, la conexión fluida con tutores y el seguimiento integral de la salud de cada paciente.
            </p>
          </div>
        </section>

        {/* Why Choose PetSync Section */}
        <section id="why-petsync-vet" className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">¿Por qué elegir PetSync?</h2>
            <div className="flex justify-center mb-6">
              <Logo />
            </div>
            <p className="text-md md:text-lg text-muted-foreground max-w-2xl mx-auto">
              PetSync está diseñado para simplificar tu día a día, permitiéndote enfocarte en la atención al paciente mientras optimizas la gestión de tu clínica y fortaleces la relación con los tutores a través de una plataforma conectada e inteligente.
            </p>
          </div>
        </section>

        {/* Simplified Features Section */}
        <section id="features-vet-portal-simplified" className="py-12 md:py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Funcionalidades Clave para tu Clínica</h2>
              <CardDescription className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Herramientas pensadas para potenciar cada aspecto de tu práctica veterinaria.
              </CardDescription>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {portalFeatures.slice(0, 3).map((feature, index) => ( // Show first 3 for brevity
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col text-center items-center p-6 bg-card">
                  <CardHeader className="p-0 mb-4">
                    <feature.icon className="h-12 w-12 text-primary mx-auto" />
                  </CardHeader>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground flex-grow">
                    {feature.description}
                  </CardDescription>
                </Card>
              ))}
            </div>
            {portalFeatures.length > 3 && (
                 <div className="text-center mt-8">
                    <p className="text-muted-foreground">Y mucho más, incluyendo gestión de sala de espera, asistencia IA y más...</p>
                 </div>
            )}
          </div>
        </section>
        
        {/* Connect with Pet Owners Section */}
        <section id="connect-tutores-vet" className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <Card className="shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:items-center bg-card">
              <div className="p-6 sm:p-8 lg:p-10">
                <UsersRound className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-3">Conecta con los tutores de tus pacientes</h3>
                <p className="text-muted-foreground text-md mb-6">
                  La app PetSync para tutores asegura una comunicación transparente y eficiente. Ellos acceden a historiales médicos compartidos, reciben recordatorios automáticos y se mantienen al tanto del cuidado de sus mascotas, facilitando una atención coordinada y reduciendo tu carga administrativa.
                </p>
                 <Button variant="outline" asChild>
                    <Link href="/#tutores">Conocer más sobre la app para Tutores</Link>
                 </Button>
              </div>
              <div className="hidden lg:block p-4">
                <div className="bg-muted rounded-lg h-64 w-full flex items-center justify-center" data-ai-hint="app interface vet tutor">
                  <ImageIcon className="h-24 w-24 text-muted-foreground/50" />
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Early Access CTA Section */}
        <section id="early-access-vet" className="py-12 md:py-16 bg-primary/10">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Transforma tu Clínica con PetSync: Solicita una Demostración o Únete al Programa de Acceso Anticipado
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Descubre cómo PetSync puede revolucionar tu práctica diaria. Regístrate para obtener acceso temprano y ayúdanos a construir la plataforma perfecta para tus necesidades.
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

    